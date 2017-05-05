Sass学习笔记
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