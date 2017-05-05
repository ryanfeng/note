Http协议（超文本传输协议）是一个无状态的请求/响应协议
http协议默认端口是80，基于tcp/ip的应用层协议，无状态的
https协议默认端口是443，基于ssl或者tls

Http请求支持的方法：
GET   请求获取Request-URI所标识的资源（1.0）
POST 在Request-URI所标识的资源后附加新的数据（1.0）
HEAD 请求获取由Request-URI所标识的资源的响应消息报头（1.0）

PUT    请求服务器存储一个资源，并用Request-URI作为其标识
DELETE 请求服务器删除Request-URI所标识的资源
OPTIONS 请求查询服务器的性能，或者查询与资源相关的选项和需求
TRACE   请求服务器回送收到的请求信息，主要用于测试或诊断
CONNECT 隧道机制

请求报文：
   请求行，请求头，空行，请求数据
响应报文：
   响应行，消息报头，空行，正文

状态码：
4XX：客户端错误，请求包含语法错误或无法完成请求
3XX：重定向，需要进一步的操作以完成请求
400客户端请求的语法错误，服务器无法理解
401请求要求用户的身份认证
403服务器理解客户端的请求，但是拒绝执行此请求
405客户端请求中的方法被禁止

Http Header里的Content-Type一般有：

    application/x-www-form-urlencoded：数据被编码为名称/值对。这是标准的编码格式。
    multipart/form-data： 数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
    text/plain： 数据以纯文本形式(text/json/xml/html)进行编码，其中不含任何控件或格式字符。postman软件里标的是RAW。

    application/json返回json数据。请求时需要把json转化为json字符串

	form的enctype属性为编码方式，常用有两种：application/x-www-form-urlencoded和multipart/form-data，默认为application/x-www-form-urlencoded。

当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2...），然后把这个字串追加到url后面，用?分割，加载这个新的url。

当action为pos时候，浏览器把form数据封装到http body中，然后发送到server。 如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。 但是如果有type=file`的话，就要用到multipart/form-data了。

当action为post且Content-Type类型是multipart/form-data，浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符(boundary)。

