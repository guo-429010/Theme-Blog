---
title: Java测试题
category:
  - Java
tag:
  - 题目
date: 2023-06-02
---

## No.1 catch和finally
```java
public class test {

    public static int test() {
        int a = 1;
        try {
            System.out.println(a / 0);
            a = 2;
        } catch (ArithmeticException e) {
            a = 3;
            return a;
        } finally {
            System.out.println("执行finally");
            a = 4;
        }
        return a;
    }

    public static void main(String[] args) {
        System.out.println(test());
    }
}

```
结果为:
- 执行finally
- 3
