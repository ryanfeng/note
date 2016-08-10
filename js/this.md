# 关键字 this 总是指向调用该方法的对象
### this的使用：
##### 1.全局的this: window
##### 2.一般函数的this: return this （严格模式返回undifined)
##### 3.作为对象方法的函数的this: 
    var o = {
        prop: 25;
        func: function() {
            return this
        }
    }
    
##### 4.对象原型链上的this:
    var o = {f:function() {return this.a}}	
    var p = Object.create(o);
    p.a = 1;
    console.log(p.f());
    
##### 5.get/set方法中的this;
##### 6.构造器中的this:
    function MyClass() {
        this.a = 37;
    }
    var o = new MyClass(); //这里返回默认this这个对象
    console.log(o.a); //37	
    function MyClass2() {
        this.a = 37;
        return {a: 38};
    }
    o = new MyClass2(); //这里返回{a: 38}这个对象
    console.log(o.a) //38
    
##### 7.call/apply中的this
###### 例子一：
    function add(c, d) {
        return this.a + this + c + d;
    }
    add.call({a:1, b:2}, 6, 7);
    add.apply({a:1, b:2}, [6, 7]);
    
###### 例子二：
    function foo(a, b) {
        console.log(a, b, this);
    }	
    foo.call(100, 1, 2); //1, 2, Number(100)
    foo.apply(false, 1, 2); //1, 2, Boolean(100)
    foo.call(null); //undifined, undifined, window
    foo.call(undifined); //undifined, undifined, window 
    严格模式：
    foo.call(null); //undifined, undifined, null
    foo.call(undifined); //undifined, undifined, undifined
    
##### 8.bind方法与this
###### 使用作用主要是绑定this 和 科里化，IE9才能用
###### 例子一：
    function f() {
        return this.a;
    }	
    var g = f.bind({a: "test"}); 
    var o = {a: 37, f:f, g:g}
    console.log(o.f(), o.g()); //37, test
    
###### 例子二：
    this.x = 9;
    var module = {
        x: 8,
        f: function() {
            return this.x;
        }
    };
    module.f();//8
    var f = module.f;
    f();//9
    var boundF = f.bind(module);
    doundF();//8
    
###### 例子三：参数科里化
    function add(a, b, c) {
        return a + b + c;
    }
    var func = add.bind(undifined, 100);
    func(1, 2); //103
    var func2 = add.bind(null, 200);
    func(1); //101
