# Grun学习笔记
========================================================
#### Grunt插件地址http://www.gruntjs.net/plugins
#### Grunt和 Grunt 插件是通过 npm 安装并管理的，npm是 Node.js 的包管理器。
#### 在安装 Grunt 前，请确保当前环境中所安装的 npm 已经是最新版本(npm update -g npm)
#### 1.安装 CLI
	npm install -g grunt-cli
#### 2.配置package.json和Gruntfile.js(Gruntfile.coffee)文件	
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
#### 3.安装 Grunt
	npm install grunt --save-dev
#### 4.运行 Grunt
	grunt
========================================================