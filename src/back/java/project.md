---
title: 使用springboot管理服务器文件
category:
  - Java
tag:
  - File
date: 2023-07-31
---

## 文件工具类
- 递归获取目录下的所有文件
```java
/**
 * org.apache.commons.io.FileUtils
 * @param url 目录
 * @param null 不排除任何子目录
 * @param true 包含子目录
 */
Collection<File> files = FileUtils.listFiles(new File(url), null, true);
```

## 文件夹操作Controller层
- ```getFiles()``` 方法用来查询文件夹下的所有文件
```java
@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping("/list")
    public R getFiles(){
        return R.ok().put("data", fileService.getFiles());
    }
}
```

## 定义接口
```java
public interface FileService {

    List<String> getFiles();

}
```

## 接口实现
- 递归查询目录下所有的文件，当文件夹下没有文件，则返回文件夹名
```java
@Service
public class FileServiceImpl implements FileService {

    @Value("${fileBackPath}")
    private String fileBackUrl;

    @Override
    public List<String> getFiles() {
        File directory = new File(fileBackUrl);
        List<String> list = new ArrayList<>();
        return directoryResolve(directory,list);
    }

    public List<String> directoryResolve(File directory,List<String> list) {
        File[] fileList = directory.listFiles();
        if(fileList != null) {
            if (fileList.length == 0) {
                list.add(replacePath(directory.getPath()));
                return list;
            }
            for(File file : fileList) {
                if(!file.isDirectory()){
                    list.add(replacePath(file.getPath()));
                }else{
                    directoryResolve(new File(file.getPath()),list);
                }
            }
        }
        return list;
    }

    public String replacePath(String path) {
        return path.replace(fileBackUrl,"");
    }

}
```

### 查询结果
![文件](../../.vuepress/public/assets/images/java_01.png)

## 优化
- 并不需要一次直接返回所有文件，只需返回当前目录下的文件，然后再次调用接口查询子目录
### 接口新增参数path
```java
@GetMapping("/list")
public R getFiles(@RequestParam("path") String path){
    return R.ok().put("data", fileService.getFiles(path));
}
```
```java
@Override
public List<String> getFiles(String path) {
    File directory = new File(fileBackUrl + path);
    List<String> list = new ArrayList<>();
    File[] fileList = directory.listFiles();
    if(fileList != null){
        for (File file : fileList) {
            list.add(replacePath(file.getPath()));
        }
    }
    return list;
}
```
### 查询结果
- 当path为空时
```json
{
    "code": 200,
    "data": [
        "测试文件.txt",
        "新建文件夹"
    ]
}
```
- path: "新建文件夹"
```json
{
    "code": 200,
    "data": [
        "新建文件夹\\aa.txt",
        "新建文件夹\\新建 ZIP 压缩文件.zip",
        "新建文件夹\\新建文件夹"
    ]
}
```
- path: "新建文件夹/新建文件夹"
```json
{
    "code": 200,
    "data": [
        "新建文件夹\\新建文件夹\\sss.txt"
    ]
}
```
