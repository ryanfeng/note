# bootStrap栅格系统原理
### 在我们开发过程中，首先需要考虑Container容器问题，那么为什么？ 
###### 1、在响应式宽度上提供宽度约束。响应式尺寸的改变其实改变的是container，行(rows)和列(columns)都是基于百分比的所以它们不需要做任何改变；
###### 2、提供padding以至于不内容不直为紧贴于浏览器边缘，两边都是15px，下图中粉色的就是了，稍后解释更多；
###### *注意：* 在一个container中永远不需要再嵌一个container，记住永远不要。
### 对于Row的使用
###### Rows 的两侧都拥有独特的负15px margin值，这样就和容器的padding 15px相互抵消掉了。
###### 以此类推，Column的padding 15px，Container的正padding值造成了15px的留空，row用负margin值反的延伸回去，所以现在col的padding值与container的padding重叠了。
###### 注意：永远不要在row外使用col,在row外使用col是无效的。
###### 列(col)的padding给内容提供了空白，使内容不会紧贴在浏览器边界上，列之间有了padding才不会互相紧贴在一起。container/row/column整这么些事儿最终要达到的结果就体现在这里了，就是为了col的补白啊...
###### 当你设置了container,row,column后，你可以在column内再创建新的栅格系统。你在右侧的列(col)内添加新的行(row)时不需再嵌container了
### 注意开发可能遇到三等分问题
#### 解决方式可以如下：
* 百分比(bootstrap使用33.333%)
* 父元素display:table,子元素：display:table-cell
* 父元素display:flex,子元素：flex:1

*参考链接：*
[外文参考](http://www.helloerik.com/the-subtle-magic-behind-why-the-bootstrap-3-grid-works)
[css等比例分割父级容器](http://blog.csdn.net/xiaobing_hope/article/details/51285695)
[池中物willian](http://www.cnblogs.com/willian/p/3558180.html?utm_source=tuicool&utm_medium=referral)
