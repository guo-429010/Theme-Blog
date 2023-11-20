---
title: mysql的加密解密
category:
  - MySQL
date: 2023-11-20
---

### 加密
- AEX_ENCRYPT(str,key)
- HEX: 将字节数据转换成十六进制字符串
```sql
SELECR HEX(AEX_ENCRYPT("123456","PWD"))
```
### 解密
- AEX_DECRYPT(str,key)
- UNHEX: 将十六进制字符串转换成字节数据
```sql
SELECT AES_DECRYPT(UNHEX("1D194A84B02AAE52DEEA972C940FD1B1"),"PWD")
```