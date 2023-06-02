---
title: Nginx教程
category:
  - Nginx
tag:
  - 教程
date: 2023-06-02
---

## 简介
- Nginx是一个高性能的HTTP和反向代理web服务器，同时也提供IMAP/POP3/SMTP服务。
- 它是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru站点开发的。Nginx以类BSD许可证的形式发布源代码，以稳定性、丰富的功能集、简单的配置文件和低系统资源消耗而闻名。
- Nginx是一个跨平台的软件，可以运行在Linux、Windows、macOS和其他许多操作系统上。

## 常用命令
- 启动：==start nginx==
- 快速停止：==nginx -s stop==
- 有序完整停止：==nginx -s quit==
- 重启：==nginx -s reload==
- 查看版本：==nginx -v==

## 本项目在nginx的配置
```conf
http {
    server {
        listen       80;
        server_name  guo123.top; 
        return 301 https://$http_host$request_uri;
        access_log off;
    }
    server {
       listen       443 ssl;
       server_name  guo123.top;

       ssl_certificate      ../ssl/sslwww.guo123.top.pem;
       ssl_certificate_key  ../ssl/sslwww.guo123.top.key;

       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

       ssl_ciphers  HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers  on;

       location / {
           root   html/guoBlog/;
           try_files $uri $uri/  /index.html
           index  index.html index.htm;
       }

       location ^~/api/ {
           proxy_pass http://localhost:8082/;
           proxy_set_header X-Real-IP   $remote_addr;
           proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
       }
    }
}
```