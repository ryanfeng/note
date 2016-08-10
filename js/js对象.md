1.本地对象
	Object
	Function
	Array
	String
	Boolean
	Number
	Date
	RegExp
	Error
	EvalError
	RangeError
	ReferenceError
	SyntaxError
	TypeError
	URIError
2.内置对象(开发者不必明确实例化内置对象，它已被实例化了)
	Global
	Math
3.宿主对象
	所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象.
	所有 BOM 和 DOM 对象都是宿主对象。

###4.创建类或对象
######1.工厂方式
	function createCar() {
	  var oTempCar = new Object;
	  oTempCar.color = "blue";
	  oTempCar.doors = 4;
	  oTempCar.mpg = 25;
	  oTempCar.showColor = function() {
	    alert(this.color);
	  };
	  return oTempCar;
	}
	var oCar1 = createCar();
	var oCar2 = createCar();
######//2.构造函数方式
	function Car(sColor,iDoors,iMpg) {
	  this.color = sColor;
	  this.doors = iDoors;
	  this.mpg = iMpg;
	  this.showColor = function() {
	    alert(this.color);
	  };
	}
	var oCar1 = new Car("red",4,23);
	var oCar2 = new Car("blue",3,25);
######3.混合的构造函数/原型方式(常用)
	function Car(sColor,iDoors,iMpg) {
	  this.color = sColor;
	  this.doors = iDoors;
	  this.mpg = iMpg;
	  this.drivers = new Array("Mike","John");
	}
	Car.prototype.showColor = function() {
	  alert(this.color);
	};
	var oCar1 = new Car("red",4,23);
	var oCar2 = new Car("blue",3,25);
	oCar1.drivers.push("Bill");
	alert(oCar1.drivers);	//输出 "Mike,John,Bill"
	alert(oCar2.drivers);	//输出 "Mike,John
######4.动态原型方法（常用）
	function Car(sColor,iDoors,iMpg) {
	  this.color = sColor;
	  this.doors = iDoors;
	  this.mpg = iMpg;
	  this.drivers = new Array("Mike","John");
	  
	  if (typeof Car._initialized == "undefined") {
	    Car.prototype.showColor = function() {
	      alert(this.color);
	    };
	    Car._initialized = true;
	  }
	}

######示例
	function StringBuffer () {
	  this._strings_ = new Array();
	}
	StringBuffer.prototype.append = function(str) {
	  this._strings_.push(str);
	};
	StringBuffer.prototype.toString = function() {
	  return this._strings_.join("");
	};
	var d1 = new Date();
	var str = "";
	for (var i=0; i < 10000; i++) {
	    str += "text";
	}
	var d2 = new Date();

	document.write("Concatenation with plus: "
	 + (d2.getTime() - d1.getTime()) + " milliseconds");

	var buffer = new StringBuffer();
	d1 = new Date();
	for (var i=0; i < 10000; i++) {
	    buffer.append("text");
	}
	var result = buffer.toString();
	d2 = new Date();

	document.write("<br />Concatenation with StringBuffer: "
	 + (d2.getTime() - d1.getTime()) + " milliseconds")
	;

###修改对象
######添加
    Number.prototype.toHexString = function() {
  		return this.toString(16);
	};
	var iNum = 15;
	alert(iNum.toHexString());
	Object.prototype.showValue = function () {
	  alert(this.valueOf());
	};
	var str = "hello";
	var iNum = 25;
	str.showValue();		//输出 "hello"
	iNum.showValue();
######修改
	Function.prototype.originalToString = Function.prototype.toString;
	Function.prototype.toString = function() {
	  if (this.originalToString().length > 100) {
	    return "Function too long to display.";
	  } else {
	    return this.originalToString();
	  }
	};	