---
title: ImageMagick
category:
  - 工具
tag:
  - 图片转换
date: 2023-06-13
---

## 简介
ImageMagick是一个免费的开源软件套件，用于编辑和处理数字图像。它可用于创建、编辑、合成或转换位图图像，并支持多种文件格式，包括 JPEG、PNG、GIF、TIFF 和 PDF。

## 安装
-[下载地址](https://imagemagick.org/script/download.php)
- 验证是否安装成功
打开cmd输入
```sh
magick --version
```
得到如下结果
```sh
Version: ImageMagick 7.1.1-11 Q16-HDRI x64 11ffa6e:20230529 https://imagemagick.org
Copyright: (C) 1999 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI Modules OpenCL OpenMP(2.0)
Delegates (built-in): bzlib cairo flif freetype gslib heic jng jp2 jpeg jxl lcms lqr lzma openexr pangocairo png ps raqm raw rsvg tiff webp xml zip zlib
Compiler: Visual Studio 2022 (193431944)
```

## 使用
- png转jpeg
```sh
magick "图片路径/img.png" "图片路径/img.jpeg"
```
- 调整大小
```sh
magick input.jpg -resize 800x600 output.jpg
```
- 裁剪图片
```sh
magick input.jpg -crop 400x300+100+50 output.jpg
```
- [文档](https://imagemagick.org/script/command-line-processing.php)