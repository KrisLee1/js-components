<!--
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-02 14:23:23
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-02 22:51:19
 * @FilePath: /js-components/Slideshow/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# Slideshow 轮播图组件

## 预览 Preview

[前往码上掘金](https://code.juejin.cn/pen/7149798794937237534)

## 使用 Use

导航按钮、上一张按钮、下一张按钮通过控件方式灵活添加。

```javascript
const slideshow = new Slideshow('#slideshow', '#slideshow .img-box');   // 创建 Slideshow
const nav = new SlideshowNavigator('#slideshow .nav-box');              // 创建导航按钮控件
const pre = new SlideshowPre('#slideshow .pre-btn');                    // 创建上一张控件
const next = new SlideshowNext('#slideshow .next-btn');                 // 创建下一张控件

slideshow.addWidgets(nav, pre, next);       // 添加控件
slideshow.autoPlay(3000);                   // 开启自动播放，时间间隔 3000ms
```

```javascript
// 链式调用
new Slideshow('#slideshow', '#slideshow .img-box')
    .addWidgets(
        new SlideshowNavigator('#slideshow .nav-box'), 
        new SlideshowPre('#slideshow .pre-btn'), 
        new SlideshowNext('#slideshow .next-btn')
    )
    .autoPlay(2000);
```

导航是通过 data-index 属性获取索引，所以导航按钮需要设置 data-index 属性的值。

```html
<div id="slideshow" class="container">
    <!-- 图片 -->
    <ul class="img-box">
        <li class="img">1</li>
        <li class="img">2</li>
        <li class="img">3</li>
        <li class="img">4</li>
        <li class="img">5</li>
    </ul>
    <!-- 导航按钮 -->
    <ul class="nav-box">
        <li class="btn current" data-index="1"></li>
        <li class="btn" data-index="2"></li>
        <li class="btn" data-index="3"></li>
        <li class="btn" data-index="4"></li>
        <li class="btn" data-index="5"></li>
    </ul>
    <!-- 上一张按钮 -->
    <div class="control-btn-box control-btn-box-left">
        <button class="btn control-btn pre-btn"><</button>
    </div>
    <!-- 下一张按钮 -->
    <div class="control-btn-box control-btn-box-right">
        <button class="btn control-btn next-btn">></button>
    </div>
  
</div>
```

当前导航按钮 class=”current“，可以用此class设置当前导航按钮的样式。

```css
.container .nav-box li.current {
    background-color: #ffffffd0;
    transform: scale(1.2);
}
```
