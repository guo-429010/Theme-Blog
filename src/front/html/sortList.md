---
title: 可拖动的排序列表
category:
  - Html
  - Javascript
  - Css
tag:
  - draggable
date: 2023-07-20
---

::: tip 实现
- draggable="true" 表示元素可以被拖动
- dragstart事件：开始拖动元素时触发
- dragend事件：拖放结束时触发
- dragover事件：元素被拖进一个有效的放置目标时触发
- [预览](https://guo123.top/api/videos/sortList.html)
:::

## 拖动效果实现代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>拖拽排序</title>
    <style>
        .main{
            display: flex;
            flex-direction: column;
            width: 460px;
        }
        li {
            list-style: none;
            border: 1px solid #34c9c9;
            border-radius: 20px;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        li + li {
            margin-top: 20px;
        }
        .dragging :where(span){
            opacity: 0;
        }
    </style>
</head>
<body>
    <div class="main">
        <li draggable="true" class="item">
            <span>No.1</span>
            <span>GGB,童话里做英雄</span>
            <span>猪猪侠</span>
        </li>
        <li draggable="true" class="item">
            <span>No.2</span>
            <span>强哥驾到,通通闪开</span>
            <span>超人强</span>
        </li>
        <li draggable="true" class="item">
            <span>No.3</span>
            <span>把整个童话世界的打扫得干干净净</span>
            <span>小呆呆</span>
        </li>
        <li draggable="true" class="item">
            <span>No.4</span>
            <span>强强科技CEO</span>
            <span>波比</span>
        </li>
    </div>
    <script>
        const list = document.querySelector('.main')

        const items = document.querySelectorAll('.item')

        items.forEach(item => {
            item.addEventListener("dragstart", () => {
                setTimeout(() => {
                    item.classList.add("dragging")
                }, 0);
            })
            item.addEventListener("dragend", () => {
                item.classList.remove("dragging")
            })
        })

        const initSortableList = (e) => {
            const draggingItem = list.querySelector(".dragging")
            const sibling = [...list.querySelectorAll(".item:not(.dragging)")]

            let nextSibling = sibling.find(item => {
                return e.clientY <= item.offsetTop + item.offsetHeight / 2
            })

            list.insertBefore(draggingItem, nextSibling)
        }

        list.addEventListener("dragover", initSortableList)
    </script>
</body>
</html>
```

