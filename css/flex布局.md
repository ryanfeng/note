# Flex布局
##### 2009年，W3C提出了一种新的方案----Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。*Flex布局将成为未来布局的首选方案。*
##### Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
##### 目前浏览器支持
![浏览器支持](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

#### Flex知识点
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
##### 容器布局：
	display: flex；
	display: inline-flex;
	display: -webkit-flex;
##### 容器属性：
##### * flex-direction属性决定主轴的方向（即项目的排列方向）。
    flex-direction: row(默认值)|row-reverse|column|column-reverse
##### * flex-wrap属性定义，如果一条轴线排不下，如何换行。
	flex-wrap: nowrap(默认)|wrap|wrap-reverse
##### * flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
	flex-flow: flex-direction 与 flex-wrap的简称， row|nowrap
##### * justify-content属性定义了项目在主轴上的对齐方式。
	justify-content: flex-start|flex-end|center|space-between|space-around
##### * align-items属性定义项目在交叉轴上如何对齐。
	align-items：flex-start|flex-end|center|baseline|stretch
##### * align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
	align-content: flex-start|flex-end|center|space-between|space-around|stretch
#####容器子元素属性：
##### * order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
	order: 0
##### * flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
	flex-grow: 0 放大比例
##### * flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
	flex-shrink: 1 缩小比例
##### * flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
	flex-basis: auto 项目占据主轴空间
##### * flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
	flex：0 1 auto 
##### * align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
	align-self: flex-start|flex-end|center|baseline|stretch

#####参考链接：
   * [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
   * [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

