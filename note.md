###知识小记和html5学习
============================================================
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
============================================================

####Http学习
============================================================
OPTIONS http://mail.163.com/ HTTP/1.1
Host: mail.163.com
Connection: Keep-Alive
GET http://mail.163.com/ HTTP/1.1
Host: mail.163.com
TRACE http://mail.163.com/ HTTP/1.1
Host: mail.163.com

GET http://www.baidu.com/ HTTP/1.1
Host: www.baidu.com
OPTIONS http://www.baidu.com/ HTTP/1.1
Host: www.baidu.com
TRACE http://www.baidu.com/ HTTP/1.1
Host: www.baidu.com
HEAD http://www.baidu.com/ HTTP/1.1
Host: www.baidu.com

TRACE / HTTP/1.1
Host: www.1yingli.cn
============================================================

####GIt学习笔记
============================================================
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

初始化
git init
git status 工作区的状态
git diff 查看修改的内容

SSH Key
$ ssh-keygen -t rsa -C "youremail@example.com"

提交
git add . 或者 git add --all/-A 
git add xxx.txt 提交到暂存区
git commit -m  'xxxxxxx' 提交到版本库

版本回退commit：针对提交到版本库的
git reset --hard commit_id 或者 HEAD^/^^/～100
git log 或者加上 --pretty=oneline  回退到哪个版本
git reflog  回到未来的哪个版本版本
修改回退add：
git reset HEAD 'file'
修改回退:
git checkout -- 'file'

删除（主要可以回退找回）
git rm 'file'

链接远端分支
克隆
git clone git@github.com:michaelliao/learngit.git

推送
$ git push -u origin master -u关联远端分支和本地分支
$ git push origin master

分支
git checkout -b dev  -b创建并切换
git branch dev
git checkout dev
git branck 查看当前分支
git branch -d dev 删除

当前分支暂存
git stash 暂停
git stash pop 回复

合并
git checkout master
git merge dev
git log --graph 查看分支合并图
git log --graph --pretty=oneline --abbrev-commit
合并分支禁用Fast forward （这样有合并历史，方便回退）
$ git merge --no-ff -m "merge with no-ff" dev

对人协作
git remote -v 查看远程信息
git remote rm origin 删除远端

创建分支
git checkout -b branch-name origin/branch-name
git branch --set-upstream branch-name origin/branch-name 建立联系
解决冲突 git pull 抓取
git push origin branch-name 
=========================================================


####css学下笔记一
=========================================================
1. 内联元素、块级元素
2. ul:list-style-type:none/circle/square            
	ul{
   	 list-style-type:none;
   	 margin:0;
   	 padding:0;
   	 overflow:hidden;
    }
    方式一:        
	   	li{
	   	 display:inline;
	    }
    方式二：
    	li{
    	 float:left;	
	    }
	    a{
	     display:block;
	     width:60px;
	     text-decoration:none;
	    }	
3. visibility:visible/hidden/collapse
4. clear:left/right/both/none;(规定元素的哪一侧不允许其他浮动元素)
7: opacity:0.5;
8: @media screen
9: <link rel="stylesheet" type="text/css" href=""/>
10: 属性选择器[type="button"]=/~=(包含)/|=(指定元素开头的单词/^=/$=
	[title]{
		color:red;
	}
	input[type='button']{
	}
11: background-image: url('');
	backgroung-position: top/center/bottom/20px 100px;
	backgroung-color: transparent;
	background-repeat；repeat/repeat-x/repeat-y/no-repeat;
	background-attachment: fixed/scroll;
	background: #ff0000 url('') no-repeat fixed center;

5: text-decoration:none/underline/overline/line-through/blink;
6：text-transform:none/uppercase/lowercase/capitalize
12: word-spacing：0 
	  letter-spacing：0  两者的区别:单个和整体
13：white-space:normal(处理空白符)/pre(不做处理)/nowrap(防止文本换行)

14：font-family: Times, TimesNR, 'New Century Schoolbook', Georgia, 'New York', serif;
15：em：相对于父类元素的自己大小。
			body {font-size:100%;}
			h1 {font-size:3.75em;}
			h2 {font-size:2.5em;}
			p {font-size:0.875em;}
16：font-variant:normal/small-caps

17：a:link/a:visited/a:hover/a:active	
18：外边距合并：只有普通文档流中块框的垂直外边距才会发生，行内框、浮动框或绝对定位之间的外边距不会合并。
19：clip剪裁绝对定位元素（position:absolute）rect(0, 50px, 100px ,0)
20: 文件对齐vertical-align:text-top/middle;
21：元素选择器:
		> 子元素选择器
		+ 相邻兄弟选择器
	伪类：
		link,visited,hover,active,focus,first-child,lang
	伪元素：
		first-line
		first-letter
		before{
			content：url();
		}	
========================================================

####css学下笔记二
========================================================
css文件嵌套：@import url(style.css);
background:
		background-image:url(bg_flower.gif),url(bg_flower_2.gif); 多个背景图
		background-size: 20px, 30px; 
		background-origin: border-box/padding-box/content-box
		background-clip:border-box/padding-box/content-box
		(background-clip 用来判断 background 是否包含 border 区域。而 background-origin 用来决定 background-position 计算的参考位置。)
文本效果：
		text-overflow: clip/ellipsis(省略号)
		text-shadow:  5px 5px 5px #FF0000; 文本阴影
		word-wrap: break-word; 在长单词或URL地址内部进行换行
		word-break: break-all;
字体设置：
		@font-face{
			font-family: myFirstFont;
			src: url('Sansation_Bold.ttf');
			font-weight:bold;
		}
用户界面：
		resize:both. 是否可由用户调整元素尺寸。
旋转transform:
		div{
			transform:rotate(30deg); (把元素顺时针旋转30度)
			transform:translate(10px, 50px); (把元素从左侧移动10像素，从顶端移动50像素。)
			transform:scale(2,4)  (把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 4 倍)
			transform:skew(20deg,30deg) (围绕 X 轴把元素翻转 20 度，围绕 Y 轴翻转 30 度)
 		}
过渡transition:
		div{
			transition: width 2s;
			-moz-transition: width 2s;
			-o-transition: width 2s;
			//-webkit-transition: width 2s, height 2s, -webkit-transform 2s;
			//transition: width 1s linear/ease/ease-in/ease-out 2s;
		}
		div:hover
		{
			width:200px;
			height:200px;
			-webkit-transform: rotate(360deg);
		}
动画animation:（@keyframes规则）
		div{
			animation: '@keyframes' 5s;
		}
		//@-moz-keyframes myfirst 
		@keyframes myfirst{
			0%   {background: red; left:0px; top:0px;}
			25%  {background: yellow; left:200px; top:0px;}
			50%  {background: blue; left:200px; top:200px;}
			75%  {background: green; left:0px; top:200px;}
			100% {background: red; left:0px; top:0px;}
		}
========================================================

####Sass学习笔记
========================================================
Sass与less的区别
安装：
	1.依赖ruby开发环境,下载ruby安装并且配置ruby环境变量。
	2.打开ruby的命令窗口（Start Command Prompt with Ruby），输入gem install sass
		@gem install sass --pre(要安装beta版本的)
		@gem update sass 升级
		sass -v 
		sass -h
	Git安装：
		git clone git://github.com/nex3/sass.git
		cd sass
		rake install	
	淘宝镜像安装：
		$ gem sources --remove https://rubygems.org/
		$ gem sources -a https://ruby.taobao.org/
		$ gem sources
			>> https://ruby.taobao.org
		$ gem install sass	
编译：(当前文件目录cmd命令窗口)
	单文件转换命令 sass style.scss style.css
	单文件监听命令 sass --watch style.scss:style.css
	文件夹监听命令 sass --watch sassFileDirectory:cssFileDirectory
	css文件转成sass/scss文件： sass-convert style.css style.scss
	css格式类型：nested(默认的)，expanded(喜欢)，compact(多行)，compressed(压缩)
		sass --watch style.scss:style.css --style compact
	编译类型：--sourcemap(推荐生成后缀名.css.map文件)，--debug-info
		sass --watch style.scss:style.css --sourcemap
		sass --watch style.scss:style.css --style expanded --sourcemap
		sass --watch style.scss:style.css --debug-info
	sublime:
			1. shift+ctrl+p:选择install Package		
			2. 再输入Sass 选择安装
			3. 再输入Sass build 选择安装
			4. ctrl+b 编译
			5. 打开tools >> Build system >> SASS 或者 SASS Compressed(css压缩格式)
		    
语法：
	文件后缀名：sass(没有大括号和分号)和scss(推荐)。
	文件导入：@import 'reset' 不要加.scss后缀名。
	注释：/**/或者//(不会显示在css文件里面)。
	变量：$fontSixe: 12px。
	默认变量: $fontSize: 14px !default; 可以被普通变量覆盖掉。
	特殊变量：#{$fontSize}相当于字符串。
	多值变量：list:
				$linkColor: #08c #333;
				a{
				  color:nth($linkColor,1);
				  &:hover{
				    color:nth($linkColor,2);
				  }
				}
			  Map:	
			    $headings: (h1: 2em, h2: 1.5em, h3: 1.2em);	
	嵌套：
		选择器嵌套（常用）&表示父类选择器
		属性嵌套
			.fakeshadow {
				border: {
					style: solid;
					left: {
					  width: 4px;
					  color: #888;
					}
					right: {
					  width: 2px;
					  color: #ccc;
					}
				}
			}
		跳出嵌套：@at-root	
	混合：@mixin 
		  @include
		  示例：
			  @mixin opacity($opacity:50) {
				  opacity: $opacity / 100;
				  filter: alpha(opacity=$opacity);
			  }
			  .opacity{
				  @include opacity; //参数使用默认值
			  }
			  .opacity-80{
			  	  @include opacity(80); //传递参数
			  }
		  @content：解决@media的问题
		  	@mixin max-screen($res){
			  @media only screen and ( max-width: $res )
			  {
			    @content;
			  }
			}
			@include max-screen(480px) {
			  body { color: red }
			}
			//-------------------------------
			@media only screen and (max-width: 480px) {
			  body { color: red }
			} 
	继承:
		@extend
			h1{
			  border: 4px solid #ff9aa9;
			}
			.speaker{
			  @extend h1;
			  border-width: 2px;
			}
			//---------------------------------
			h1,.speaker{
			  border: 4px solid #ff9aa9;
			}
	函数：
		$baseFontSize:      10px !default;
		$gray:              #ccc !defualt;        
		// pixels to rems 
		@function pxToRem($px) {
		  @return $px / $baseFontSize * 1rem;
		}
		body{
		  font-size:$baseFontSize;
		  color:lighten($gray,10%);
		}
		.test{
		  font-size:pxToRem(16px);
		  color:darken($gray,10%);
		}
	运算，条件判断(@if),三目判断(if)，循环(@for,@each)
========================================================

####Grunt学习笔记
========================================================
http://www.gruntjs.net/plugins
Grunt和 Grunt 插件是通过 npm 安装并管理的，npm是 Node.js 的包管理器。
在安装 Grunt 前，请确保当前环境中所安装的 npm 已经是最新版本(npm update -g npm)
1.安装 CLI
	npm install -g grunt-cli
2.配置package.json和Gruntfile.js(Gruntfile.coffee)文件	
	pachage.json：
		{
		  "name": "my-project-name",
		  "version": "0.1.0",
		  "devDependencies": {
		  }
		}
	Gruntfile.js：
		module.exports = function(grunt) {
			grunt.initConfig({
			  pkg: grunt.file.readJSON('package.json'),
			  uglify: {
			    options: {
			      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			    },
			    build: {
			      src: 'src/<%= pkg.name %>.js',
			      dest: 'build/<%= pkg.name %>.min.js'
			    }
			  }
			});
			grunt.loadNpmTasks('grunt-contrib-uglify');
			grunt.registerTask('default', ['uglify']);
		};
3.安装 Grunt
	npm install grunt --save-dev
4.运行 Grunt
	grunt
========================================================

####JSON学习：
========================================================
Json是JavaScript对象表达法。
Json数据分为：字符串和对象；
转化方法：
 （1）浏览器自带(Firefox，chrome，opera，safari，ie9，ie8)
	JSON.stringify(obj)将JSON转为字符串。
	JSON.parse(string)将字符串转为JSON格式，或者eval("("+c+")")。
  (2) Jquery
  	JSON转化为字符串：jQuery.stringifyJSON(obj)。
  	字符串转化为JSON对象：JQuery.parseJSON(json)。
  (3) json.js
  	JSON对象转化为字符串：obj.toJSONString()。
  	字符串转化为JSON对象：str.parseJSON()。	
特别注意：如果obj本来就是一个JSON对象，那么运用 eval（）函数转换后（哪怕是多次转换）还是JSON对象，但是运用 parseJSON（）函数处理后会有疑问（抛出语法异常）。  	
========================================================


####JavaScript学习
========================================================
1.JavaScript:EAMCScript + Dom + Bom
2.特点：区分大小写，变量是弱类型的。
3.变量命名：下划线、字母、$开头。
4.原始值(Undefined,Null,Boolean,Number,String):栈（stack）;引用值:堆（heap）。
5.Null: typeof如果变量是一种引用类型或 Null 类型的: object。
6.Unfinied: var temp; -->undefined ,alert(typeof oTemp2); -->undifined 
7.Number:8进制 0开头，16进制 0x开头。
8.Infinity: 无穷大 isFinite();
9.NaN: 非数字 isNaN; alert(NaN == NaN);  //输出 "false"
10.类型转化
		toString()
		parseInt()
		parseFloat()
		强制类型转化：
			Boolean(value)
			Number(value)
			String(value)
String方法:
11.instanceof 和 typeof的区别
	var oStringObject = new String("hello world");
	alert(oStringObject instanceof String);	//输出 "true"
	typeof 引用类型的值都会返回 object
12.toLowerCase()/toLocaleLowerCase()/toUpperCase()/toLocaleUpperCase()
13.slice()与substring()的区别
	var oStringObject = new String("hello world");
	alert(oStringObject.slice("3"));		//输出 "lo world"
	alert(oStringObject.substring("3"));		//输出 "lo world"
	alert(oStringObject.slice("3", "7"));		//输出 "lo w"
	alert(oStringObject.substring("3", "7"));	//输出 "lo w"

	var oStringObject = new String("hello world");
	alert(oStringObject.slice("-3"));		//输出 "rld"
	alert(oStringObject.substring("-3"));	//输出 "hello world"
	alert(oStringObject.slice("3, -4"));		//输出 "lo w"
	alert(oStringObject.substring("3, -4"));	//输出 "hel"   
14.indexOf() 与 lastIndexOf()的区别: indexof(e) 
15.charAt() 与 charCodeAt() 的区别: charAt(2)
16.localCompare() 比较两个字符串大小
17.concat() 结合两个字符串

