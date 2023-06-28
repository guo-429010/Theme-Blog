---
title: socket.io简单使用
category:
  - Java
  - socket.io
tag:
  - 通讯
date: 2023-06-28
---

## 引入
```xml
<dependency>
    <groupId>com.corundumstudio.socketio</groupId>
    <artifactId>netty-socketio</artifactId>
    <version>1.7.19</version>
</dependency>
```

## 配置
```java
@Bean
public SocketIOServer socketIOServer() {
    com.corundumstudio.socketio.Configuration conf = new com.corundumstudio.socketio.Configuration();
    conf.setHostname(host);
    conf.setPort(port);

    return new SocketIOServer(conf);
}

@Bean
public SpringAnnotationScanner springAnnotationScanner() {
    return new SpringAnnotationScanner(socketIOServer());
}
```

## 事件处理
### 启动服务
```java
@PostConstruct
private void start() {
    try {
        socketIOServer.start();
        log.info("socketServer已启动");
    }catch (Exception e){
        e.printStackTrace();
    }
}
```
### 终止服务
```java
@PreDestroy
private void destroy(){
    try {
        socketIOServer.stop();
        log.info("socketServer已停止");
    }catch (Exception e){
        e.printStackTrace();
    }
}
```
### 监听链接创建
```java
@OnConnect
public void onConnect(SocketIOClient client) {
    String userId = client.getHandshakeData().getSingleUrlParam("userId");
    ChatUserDto user = sysUserService.findById(userId);
    chatUsers.putIfAbsent(userId, user);
    String msg = "用户：" + user.getNickname() + "------加入聊天室";
    log.info(msg);
    socketIOServer.getBroadcastOperations().sendEvent("login-remind",msg);
}
```
### 监听链接关闭
```java
@OnDisconnect
public void onDisconnect(SocketIOClient client) {
    String userId = client.getHandshakeData().getSingleUrlParam("userId");
    ChatUserDto user = sysUserService.findById(userId);
    chatUsers.remove(userId);
    String msg = "用户：" + user.getNickname() + "------离开聊天室";
    log.info(msg);
    socketIOServer.getBroadcastOperations().sendEvent("logout-remind",msg);
}
```
### 收到信息和广播
```java
@OnEvent("send-message")
public void onChat(SocketIOClient client, MessageDto messageDto) {
    ChatMsgDto msg = new ChatMsgDto();
    msg.setUser(chatUsers.get(messageDto.getUserId()));
    msg.setContent(messageDto.getContent());
    msg.setTime(new Date());
    log.info("收到来自---" + msg.getUser().getNickname() + "---的消息---" + messageDto.getContent());
    socketIOServer.getBroadcastOperations().sendEvent("receive-message", msg);
    String value = redisTemplate.boundValueOps("ChatMessage").get();
    if(value == null) {
        list.add(msg);
        redisTemplate.boundValueOps("ChatMessage").set(JSONObject.toJSONString(list));
    }else{
        list = Objects.requireNonNull(JSONObject.parseArray(value)).toJavaList(ChatMsgDto.class);
        list.add(msg);
        redisTemplate.boundValueOps("ChatMessage").set(JSONObject.toJSONString(list));
    }
}
```
## 获取聊天记录
```java
@RestController
@RequestMapping("/socket/chat")
public class SocketIOController {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @GetMapping("/roomMsg")
    public R getRoomMsg() {
        String value = redisTemplate.boundValueOps("ChatMessage").get();
        List<ChatMsgDto> list = Objects.requireNonNull(JSONObject.parseArray(value)).toJavaList(ChatMsgDto.class);
        return R.ok().put("roomMsg", list);
    }
}
```
