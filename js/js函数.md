1.函数是 ECMAScript 的核心。
2.如果函数无返回值，那么可以调用没有参数的 return 运算符，随时退出函数。
3.如果函数无明确的返回值，或调用了没有参数的 return 语句，那么它真正返回的值是 undefined。
4.arguments获取函数的参数
	function howManyArgs() {
	  alert(arguments.length);
	}
	howManyArgs("string", 45);
	howManyArgs();
	howManyArgs(12);
	( ECMAScript 不会验证传递给函数的参数个数是否等于函数定义的参数个数(最多25个)
	  任何遗漏的参数都会以 undefined 传递给函数，多余的函数将忽略。)
5.函数实际上是功能完整的对象.
	Function 对象的方法和属性。
		length参数个数。
		valueOf和toString方法返回函数的源代码。
	var doAdd = new Function("iNum", "alert(iNum + 10)");
	var alsodoAdd = doAdd;
	doAdd(10);	//输出 "20"
	alsodoAdd(10);	//输出 "20"
6.创建构造函数
    function Person(name) {
        this.name = name;
        this.getName = function() {
            return this.name;
        }
    }
    var p = new Person('小明');
