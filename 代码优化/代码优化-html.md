# 代码优化--html

## 标签有多个属性的时候，可以换行显示

原因：提高可读性

> 修改前

```
<div class="class" v-for="(item, index) in items" :key="index"></div>
```

> 修改后

```
<div
  class="class"
  v-for="(item, index) in items"
  :key="index"
></div>
```

## 尽量用循环代替重复代码

原因：方便维护

> 修改前

```
<div class="class">item1</div>
<div class="class">item2</div>
```

> 修改后

```
<div
  class="class"
  v-for="(item, index) in items"
  :key="index"
>
  {{ item }}
</div>
items: ['item1', 'item2']
```

## 可以尽量使用自带样式的标签；如需要显示粗体字，可用<b>标签、如需要鼠标显示手势，可用<a>标签

原因：减少代码量

> 修改前

```
<span>bold</span>
span { font-weight: bold; }
```

> 修改后

```
<b>bold</b>
```
