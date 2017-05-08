# JSON学习：
========================================================
#### Json是JavaScript对象表达法。
#### Json数据分为：字符串和对象；
#### 转化方法：
#### (1)浏览器自带(Firefox，chrome，opera，safari，ie9，ie8)
#### 	JSON.stringify(obj)将JSON转为字符串。
#### 	JSON.parse(string)将字符串转为JSON格式，或者eval("("+c+")")。
#### (2)Jquery
####   	JSON转化为字符串：jQuery.stringifyJSON(obj)。
####   	字符串转化为JSON对象：JQuery.parseJSON(json)。
#### (3)json.js
####   	JSON对象转化为字符串：obj.toJSONString()。
####   	字符串转化为JSON对象：str.parseJSON()。	
  	
#### 特别注意：如果obj本来就是一个JSON对象，那么运用 eval（）函数转换后（哪怕是多次转换）还是JSON对象，但是尽量不要用，效率较低。
#### 但是运用 parseJSON（）函数处理后会有疑问（抛出语法异常）。  	
========================================================