#什么是DOM？
1.用一组结构化的节点以及对象来表示文档。本质上就是将网页和脚本语言以及编程语言连接起来。
2.DOM 可被 JavaScript 用来读取、改变 HTML、XHTML 以及 XML 文档。
3.主要要为：微软DOM与W3C DOM，一般IE实现的是微软DOM，而其它浏览器则不同程度的实现了W3C DOM。
![][images/2012041022080638.jpg]
	
获取节点：1.document.getElementById("")
  			document.getElementByTagName("")
写入文本：2.document.write("")
元素写入文本：3.document.getElementById("").innerHTML = "';
修改属性	4.document.getElementById("").attribute = ""
				document.getElementById("image").src="landscape.jpg";
修改样式 5.document.getElementById("").style.property = new style;
			document.getElementById("p2").style.color="blue";
添加事件 6.document.getElementById("").onclick = function;
			onclick,onload,onunload,onchange,onmouseover,onmouseout,onmousedown,onmouseup,onfocus
添加节点
	整个文档是一个文档节点
	每个 HTML 元素是元素节点
	HTML 元素内的文本是文本节点
	每个 HTML 属性是属性节点
	注释是注释节点

	parentNode
	childNodes
	attributes 
	firstChild
	lastChild
	nextSibling
	previousSibling

	var para = document.createElement("p");
	var node = document.createTextNode("asdasd");
	para.appendChild(node);

	parent.removeChild(child);
	child.parentNode.removeChild(child);




