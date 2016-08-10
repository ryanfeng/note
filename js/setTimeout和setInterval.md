# setTimeout和setInterval
##### setTimeout在指定的毫秒数后，将定时任务处理的函数添加到执行队列的队尾。
##### setInterval按照指定的周期(以毫秒数计时)，将定时任务处理函数添加到执行队列的队尾。
	for(var i = 1; i <= 3; i++) {
        setTimeout(function(){
            console.log(i);
        },100);
    }
##### 其输入结果为3个4    
##### 我们再来看看下面的函数，如下：
    setTimeout(function(){
        console.log("打印我，我是异步执行的");
    }, 100);
    console.log("我是新来的，我要先执行");
##### 或者
    setTimeout(function(){
        console.log("打印我，我是异步执行的");
    }, 100);
    console.log("我是新来的，我要先执行");
##### 运行结果都是：先打印出 “我是新来的，我先执行”这句代码，接着打印”打印我，我是异步执行的”代码。

### 理解javascript线程。
##### Javascript引擎是单线程运行的，浏览器无论在什么时候都只且只有一个线程在运行的。
##### 那么单线程是如何配合浏览器内核处理这些定时器和相应浏览器事件呢？
浏览器内核允许多个线程异步执行，这些线程在内核控制下相互配合以保持同步，比如一个浏览器至少有3个以上的线程，有：javascript引擎线程，界面渲染线程，浏览器事件触发线程，除这些以外，也有一些执行完的线程，比如http请求线程，这些异步线程都会产生不同的异步的事件。
##### 界面渲染线程：
该线程负责渲染浏览器HTML界面元素，当界面需要重绘或由于某种操作引发回流(reflow)，该线程就会执行，`该线程与javascript引擎线程是互斥的`，因为javascript引擎运行脚本期间，浏览器渲染线程都是出于挂起状态的，比如我们常见的是在页面head标签内不建议把JS放在头部的原因，希望要把JS放在尾部或者使用异步加载等操作。因此在脚本中执行对界面进行更新操作，如动态添加节点或者删除节点等更新会把这些事件放在队列当中，等javascript引擎空闲时才有机会渲染出来。
##### 浏览器事件触发线程：
用户单击一个已附加有单击事件处理器dom元素时，会有一个单击事件排入队列，但是该单击事件处理器要等到当前所有正在运行的代码均已结束才会执行。
##### 定时触发线程：
这里谈到的定时计数器不是由javascript引擎计数的，因为javascript引擎是单线程的，如果处于堵塞状态就计不了时的，它必须依赖外部计时并触发定时，所以队列中的定时事件也是异步事件。

### 理解setTimeout与setInterval异步事件
Javascript最基础的异步函数是setTimeout与setInterval，setTimeout会在一定的时间后执行相应的函数，它接受一个回调函数和一个毫秒时间，比如如下：    
    
    console.log( "a" );
    setTimeout(function() {
        console.log( "c" )
    }, 500 );
    setTimeout(function() {
        console.log( "d" )
    }, 500 );
    setTimeout(function() {
        console.log( "e" )
    }, 500 );
    console.log( "b" );

控制台先输出“a”、“b”，大约500毫秒后，再看到“c”、“d”、“e”。

但是如果我把第一个setTimeout的延时时间改大一点或者改为600毫秒，那么打印出来就分别是a，b，d，e，c了。你可能听过事件循环这个词，它是用于描述队列的工作方式的。当异步函数执行时，回调函数就会被压入这个队列里面，javascript引擎直到异步函数执行完，才会开始出来这个事件循环，这意味着javascript也并不是多线程的，事件循环是一个先进先出的（FIFO）队列，这说明回调是按照他们被加入队列的顺序执行的(在相同的情况下。)，但是如果延迟时间不一样的话，那么就不会了，就像上面的列子把定时毫秒数改大点输出来的就不一样了。
### 异步函数的类型
#####在Javascript环境中提供的异步函数分为2大类：I/O函数和计时函数。
我们都知道创建nodeJS不是为了在服务器上运行javascript，而是因为javascript语言可以完美的实现非堵塞式的I/O。比如典型的ajax请求，如下代码：
    
    var url = "http://localhost/setTimeout/index2.php";
    var xhr=new XMLHttpRequest;
    xhr.open("GET","http://localhost/setTimeout/index2.php",true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState<4)
            return;
        alert(xhr.responseText);
    };
    alert("Ajax还没完成呢？");

运行结果后先执行”Ajax还没完成呢？”，后执行onreadystatechange的回调函数。在ajax函数中先执行send方法后，再绑定事件呢，而不是先绑定事件，再send呢？

其实xhr对象使用了其他线程，这里涉及到一些跨线程通信的问题，跨线程访问数据时需要使用委托，否则会发生数据冲突，所谓委托其实就是一个线程向另一个线程发送消息，但是xhr线程想要触发主线程xhr对象的onreadystatechange事件就需要委托，而主线程目前是忙碌状态，它正在出理初始化消息，只有等到初始化消息空闲后才会执行子线程的委托处理，而初始化消息空闲时就意味着onreadystatechange事件被绑定上了，所以后面的代码执行会永远比xhr线程执行要快。所以先会执行后面的alert对话框，再执行onreadystatechange事件。当然ajax请求第三个参数我们可以设置成false，同步请求，一般情况下还是异步请求好，但是为了处理一些特殊的需求，也可以设置同步请求(注意：同步请求会堵塞浏览器加载，所以如果请求的数据很大的时候，还是考虑异步请求。)，比如一些常见的需求，发送ajax请求后，要打开一个新窗口这样的一个需求，我们都知道如果是异步请求chrome和firefox直接会被拦截掉，但是如果我设置了同步请求就可以实现发送ajax请求后，再打开一个新窗口了。

我们已经看到，异步函数非常适用于I/O操作，但是我们现在想让一个函数在将来某时刻来运行或者一个动画函数在将来某个时候来执行动画效果，这时候我们会想到javascript中的setTimeout与setInterval函数了。但是setTimeout与setInterval有如下缺陷：

###### 1.当同一个javascript进程运行的代码时候，任何javascript计时函数都无法使代码运行起来，如下demo测试：

    var start = new Date;
    stTimeout(function(){
        var end = new Date;
        console.log("Time:",end-start,'ms');
    },500);
    while(new Date - start < 1000) {            
    }

想打印出上面的console.log, 在浏览器一直刷新看到，第一次1020ms，第二次1029ms，反正结果一直是1s以上，也就是说后面的函数如果执行时间非常长的话，那么setTimeout代码永远不会执行。

###### 2. setInterval根据HTML规范可知：在一个小时之内会延迟 4-5ms这么一个延迟。也就是说使用这个计时不是非常精确。

