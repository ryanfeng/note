# cookie，sessionStorage，localStorage 的区别：
### localStorage:
1、 没有时间限制的数据存储，
2、 	支持5M大小，
3、 	只支持string类型的存储，
4、 	ie8以上支持，
5、 	在隐私模式下不可读，
6、 	作用是为本地存储数据
###  sessionStorage: 
1、 	 在关闭页面后即被清空，也就是当前回话结束,
2、 	 也是5M大小左右，
3、 	 其他都和localStorage一样,
### cookie:
1、 	一个最多支持4k,
2、 浪费带宽，每次请求新的页面都要加上，
3、 	不可以跨域，
4、 	一个域名下面最多20cookie，
5、 	作用是与服务器进行交互，作为HTTP规范的一部分而存在
### cookie 和session 的区别：
1、 	 cookie数据存放在客户的浏览器上，session数据放在服务器上。
2、 	 cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗，考虑到安全应当使用session。
3、 	 session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用COOKIE。
4、 	 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
5、 	 所以个人建议：将登陆信息等重要信息存放为SESSION，其他信息如果需要保留，可以放在COOKIE中
### 原因：
#### 由于HTTP协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识具体的用户，这个机制就是Session.典型的场景比如购物车，当你点击下单按钮时，由于HTTP协议无状态，所以并不知道是哪个用户操作的，所以服务端要为特定的用户创建了特定的Session，用用于标识这个用户，并且跟踪用户，这样才知道购物车里面有几本书。这个Session是保存在服务端的，有一个唯一标识。在服务端保存Session的方法很多，内存、数据库、文件都有。集群的时候也要考虑Session的转移，在大型的网站，一般会有专门的Session服务器集群，用来保存用户会话，这个时候 Session 信息都是放在内存的，使用一些缓存服务比如Memcached之类的来放 Session。
#### 思考一下服务端如何识别特定的客户？这个时候Cookie就登场了。每次HTTP请求的时候，客户端都会发送相应的Cookie信息到服务端。实际上大多数的应用都是用 Cookie 来实现Session跟踪的，第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie 里面记录一个Session ID，以后每次请求把这个会话ID发送到服务器，我就知道你是谁了。有人问，如果客户端的浏览器禁用了 Cookie 怎么办？一般这种情况下，会使用一种叫做URL重写的技术来进行会话跟踪，即每次HTTP交互，URL后面都会被附加上一个诸如 sid=xxxxx 这样的参数，服务端据此来识别用户。
#### Cookie其实还可以用在一些方便用户的场景下，设想你某次登陆过一个网站，下次登录的时候不想再次输入账号了，怎么办？这个信息可以写到Cookie里面，访问网站的时候，网站页面的脚本可以读取这个信息，就自动帮你把用户名给填了，能够方便一下用户。这也是Cookie名称的由来，给用户的一点甜头。

### 所以，总结一下：
#### Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；
#### Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现Session的一种方式。
