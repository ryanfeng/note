var Public = Public || {};
Public.isIE6 = !window.XMLHttpRequest;
/*获取URL参数值*/
Public.getRequest = function() {
   var param, url = location.search, theRequest = {};
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0, len = strs.length; i < len; i ++) {
		 param = strs[i].split("=");
         theRequest[param[0]]=decodeURIComponent(param[1]);
      }
   }
   return theRequest;
};
/*批量绑定页签打开*/
Public.pageTab = function() {
	$(document).on('click', '[rel=pageTab]', function(e){
		e.preventDefault();
		var rightId = $(this).data('requiredright');
		if (rightId && !Business.verifyRight(rightId)) {
			return ;
		}
		var tabid = $(this).attr('tabid'), url = $(this).attr('href'), showClose = $(this).attr('showClose'), text = $(this).attr('tabTxt') || $(this).text(),parentOpen = $(this).attr('parentOpen');
		if(parentOpen){
			parent.tab.addTabItem({tabid: tabid, text: text, url: url, showClose: showClose});
		} else {
			tab.addTabItem({tabid: tabid, text: text, url: url, showClose: showClose});
		}
	});
};
//设置表格宽高
Public.setGrid = function(adjust){
	var adjust = adjust || 62;
	var gridW = $(window).width(), gridH = $(window).height() - $("#dataGrid").offset().top - adjust;
	return {
		w : gridW,
		h : gridH
	}
};
//重置表格宽高
Public.resetGrid = function(adjust){
	var resize = Public.setGrid(adjust);
	$("#grid").jqGrid('setGridWidth', resize.w);
	$("#grid").jqGrid('setGridHeight', resize.h);
};

Public.tips = function(options){ return new Public.Tips(options); }
Public.Tips = function(options){
	var defaults = {
		renderTo: 'body',
		type : 0,
		autoClose : true,
		removeOthers : true,
		time : undefined,
		top : 15,
		onClose : null,
		onShow : null
	}
	this.options = $.extend({},defaults,options);
	this._init();
	
	!Public.Tips._collection ?  Public.Tips._collection = [this] : Public.Tips._collection.push(this);
	
}

Public.Tips.removeAll = function(){
	try {
		for(var i=Public.Tips._collection.length-1; i>=0; i--){
			Public.Tips._collection[i].remove();
		}
	}catch(e){}
}

Public.Tips.prototype = {
	_init : function(){
		var self = this,opts = this.options,time;
		if(opts.removeOthers){
			Public.Tips.removeAll();
		}

		this._create();

		this.closeBtn.bind('click',function(){
			self.remove();
		});

		if(opts.autoClose){
			time = opts.time || opts.type == 1 ? 6000 : 4000;
			window.setTimeout(function(){
				self.remove();
			},time);
		}

	},
	
	_create : function(){
		var opts = this.options;
		this.obj = $('<div class="ui-tips"><i></i><span class="close"></span></div>').append(opts.content);
		this.closeBtn = this.obj.find('.close');
		
		switch(opts.type){
			case 0 : 
				this.obj.addClass('ui-tips-success');
				break ;
			case 1 : 
				this.obj.addClass('ui-tips-error');
				break ;
			case 2 : 
				this.obj.addClass('ui-tips-warning');
				break ;
			default :
				this.obj.addClass('ui-tips-success');
				break ;
		}
		
		this.obj.appendTo('body').hide();
		this._setPos();
		if(opts.onShow){
				opts.onShow();
		}

	},

	_setPos : function(){
		var self = this, opts = this.options;
		if(opts.width){
			this.obj.css('width',opts.width);
		}
		var h =  this.obj.outerHeight(),winH = $(window).height(),scrollTop = $(window).scrollTop();
		//var top = parseInt(opts.top) ? (parseInt(opts.top) + scrollTop) : (winH > h ? scrollTop+(winH - h)/2 : scrollTop);
		var top = parseInt(opts.top) + scrollTop;
		this.obj.css({
			position : Public.isIE6 ? 'absolute' : 'fixed',
			left : '50%',
			top : top,
			zIndex : '9999',
			marginLeft : -self.obj.outerWidth()/2	
		});

		window.setTimeout(function(){
			self.obj.show().css({
				marginLeft : -self.obj.outerWidth()/2
			});
		},150);

		if(Public.isIE6){
			$(window).bind('resize scroll',function(){
				var top = $(window).scrollTop() + parseInt(opts.top);
				self.obj.css('top',top);
			})
		}
	},

	remove : function(){
		var opts = this.options;
		this.obj.fadeOut(200,function(){
			$(this).remove();
			if(opts.onClose){
				opts.onClose();
			}
		});
	}
}

// zhuweiwu add
/*进度条(与jquery.dialog.js配合使用)
**@param {Object} eg.{id : 'tidy-process', content : '正在整理凭证，请耐心等待。', width : 510, height : 100, animateTime : 7000}
**注意id、content这两个属性是必填属性
**@return {Object} 
*/
Public.process = function (options){
	var options = options || {};
	if(!options.id || !options.content) return false;
	var pop = $.dialog({
		title :  false,
		width : options.width || 510,
		height : options.height || 100,
		content : '<div class="mod-process" id="' + options.id + '"><p class="tip">' + options.content + '</p><div class="process"><span></span></div></div>',
		lock : true,
		cache : false,
		esc : false,
		parent: options.parent
	});

	var process = $('#' + options.id), 
		  width = (options.width || 510) - 70, 
		  timeId;
	process.css('width', width);

	function processAnimate(){
		$('.process span', process).animate({width: width},options.animateTime || 7000,function(){ $(this).css('width', 0) });
	}

	processAnimate();
	timeId = setInterval(processAnimate,options.animateTime);

	return {pop : pop, timeId : timeId};
};
//快捷键
Public.keyCode = {
	ALT: 18,
	BACKSPACE: 8,
	CAPS_LOCK: 20,
	COMMA: 188,
	COMMAND: 91,
	COMMAND_LEFT: 91, // COMMAND
	COMMAND_RIGHT: 93,
	CONTROL: 17,
	DELETE: 46,
	DOWN: 40,
	END: 35,
	ENTER: 13,
	ESCAPE: 27,
	HOME: 36,
	INSERT: 45,
	LEFT: 37,
	MENU: 93, // COMMAND_RIGHT
	NUMPAD_ADD: 107,
	NUMPAD_DECIMAL: 110,
	NUMPAD_DIVIDE: 111,
	NUMPAD_ENTER: 108,
	NUMPAD_MULTIPLY: 106,
	NUMPAD_SUBTRACT: 109,
	PAGE_DOWN: 34,
	PAGE_UP: 33,
	PERIOD: 190,
	RIGHT: 39,
	SHIFT: 16,
	SPACE: 32,
	TAB: 9,
	UP: 38,
	F7: 118,
	F12: 123,
	S: 83,
	WINDOWS: 91 // COMMAND
}
/**
	 * 节点赋100%高度
	 *
	 * @param {object} obj 赋高的对象
*/
Public.setAutoHeight = function(obj){
	if(!obj || obj.length < 1){
		return ;
	}
	
	Public._setAutoHeight(obj);
	$(window).bind('resize', function(){
		Public._setAutoHeight(obj);
	});
	
}

Public._setAutoHeight = function(obj){
	obj = $(obj);
	//parent = parent || window;
	var winH = $(window).height();
	var h = winH - obj.offset().top - (obj.outerHeight() - obj.height());
	obj.height(h);
}

//Ajax请求，
//url:请求地址， params：传递的参数{...}， callback：请求成功回调  
Public.postAjax = function(url, params, callback){    
	$.ajax({  
	   type: "POST",
	   url: url,  
	   cache: false,  
	   async: true,  
	   dataType: "json",  
	   data: params,  
		
	   //当异步请求成功时调用  
	   success: function(data, status){  
		   callback(data);  
	   },  
		
	   //当请求出现错误时调用  
	   error: function(err){  
			Public.tips({type: 1, content : '操作失败了哦！' + err });
	   }  
	});  
};
//Ajax请求，
//url:请求地址， params：传递的参数{...}， callback：请求成功回调  
Public.getAjax = function(url, params, callback){    
	$.ajax({  
	   type: "GET",
	   url: url,  
	   cache: false,  
	   async: true,  
	   dataType: "json",  
	   data: params,  
		
	   //当异步请求成功时调用  
	   success: function(data, status){  
		   callback(data);  
	   },  
		
	   //当请求出现错误时调用  
	   error: function(err){  
			Public.tips({type: 1, content : '操作失败了哦！' + err });
	   }  
	});  
};
Public.currency = function(val) {
	val = parseFloat(val);
	if(val == 0 || isNaN(val)){
		return '&nbsp;';
	}
	val = val.toFixed(2);
 	var reg = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
 	return val.replace(reg,"$1,");
};
Public.number = function(val) {
	
	var val = Number(val);
	return val ? val : '&nbsp;';
};
var Business = Business || {};	//业务对象
/**
	 * 科目树弹窗
	 *
	 * @param {object} target 目标对象
	 * @param {function} callback 数据选择后回调
	 * @param {boolean} detail 是否只能是明细节点
*/
Business.subjectTreePop = function(target,callback,detail){
	if(frameElement.api) {
		var api = frameElement.api, W = api.opener;
	} else {
		var W = window;
	}
}

Business.initSubjectAutoComplete = function(obj,opts){
	obj = $(obj);
	if (obj.length == 0) {return};
	var opts = $.extend(true,{
		data: function(){
			return parent.SUBJECT_DATA || parent.parent.SUBJECT_DATA || top.SUBJECT_DATA;
		},
		formatText: function(data){
			return data.number + ' ' + data.fullName;
		},
		value: 'id',
		editable: true,
		defaultSelected: -1,
		customMatch: function(text,query){
			query = query.toLowerCase();
			var idx = text.toLowerCase().search(query);
			if(/^\d+$/.test(query)){
				if(idx == 0){return true;}
			} else {
				if(idx != -1){return true;}
			}
			return false;
		},
		maxListWidth: 350,
		cache: false,
		forceSelection: true,
		maxFilter: 10,
		editable: true,
		trigger: false,
		listHeight: 182,
		listWrapCls: 'ui-droplist-wrap ui-subjectList-wrap'
	},opts);
	return obj.combo(opts).getCombo();
}

Business.initSubjectItem = function(obj,opts){
	var combo = Business.initSubjectAutoComplete(obj,opts);

	var trigger = obj.find('.subject-trigger');
	obj.bind('mouseover',function(){
		trigger.css('display','block');
	}).bind('mouseleave',function(){
		trigger.css('display','none');
	});
	trigger.bind('click',function(e){
		e.preventDefault();
		Business.subjectTreePop(combo,onTreeDataSelect);
	});

	var input = obj.find('input');
	input.bind('keydown', function(e){
		if(e.keyCode == 118){ //F7
			e.preventDefault();
			Business.subjectTreePop(combo,onTreeDataSelect);
		}
	});


	function onTreeDataSelect(data,combo){
		var val = data.number + ' ' +data.fullName;
		combo.selectByText(val);
	}

	return combo;

}



/**
	 * 获取期间数据
	 *
	 * @param {String} 
	 * @return {Object} 将格式为 '2012-7' 的期间数据转换成{y : 2012, p : 7}格式
*/
Business.getPeriodData = function (period){
	var arr = period.split('-');
	var y = parseInt(arr[0], 10);
	var p = parseInt(arr[1], 10);

	return {y : y, p : p};
}

/**
	 * 初始化期间
	 *
	 * @param {String} 
	 * @param {String} 
	 * @param {String} 
*/

Business.initPeriodItem = function(obj, opts){
	if (obj.length == 0) {return};
	$(obj).combo($.extend(true,{
		data: function(){
			return parent.PERIOD_DATA || parent.parent.PERIOD_DATA || top.PERIOD_DATA;
		},
		value: 'yearPeriod',
		text: 'disPeriod',
		width: 100,
		listHeight: 312,
		cache: false
	},opts));
	return $(obj).getCombo();
}





/**
	 * 初始化凭证字
	 *
	 * @param {String} 
	 * @param {Boolean} 
	 * @param {Object} 
*/
Business.initVoucherWord = function(obj,opts){
	if (obj.length == 0) {return};
	var opts = $.extend(true, {
		data: function(){
			return parent.VOUCHER_WORD || parent.parent.VOUCHER_WORD || top.VOUCHER_WORD;
		},
		defaultSelected: ['defaultCode', true],
		text: 'name',
		width: 'auto',
		value: 'id',
		maxWidth: '100',
		maxListWidth: '100',
		minWidth: '60',
		cache: false,
		editable: false
	}, opts);
	return $(obj).combo(opts).getCombo();
}

//Js 检测客户端是否安装Acrobat pdf阅读器
function isAcrobatPluginInstall(){
//如果是firefox浏览器
	if (navigator.plugins && navigator.plugins.length) {
		for (var x=0; x<navigator.plugins.length;x++) {	
			if (navigator.plugins[x].name== 'Adobe Acrobat')
			return true;
		}
	}
//下面代码都是处理IE浏览器的情况
	else if (window.ActiveXObject){
	for (x=2; x<10; x++){
	try	{
		oAcro=eval_r("new ActiveXObject('PDF.PdfCtrl."+x+"');");
		if (oAcro){
		  return true;
		}
	}catch(e) {
		
	}
	}
	try	{
	oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
	if (oAcro4)
	   return true;
	}
	catch(e) {}
	try	{
	oAcro7=new ActiveXObject('AcroPDF.PDF.1');
	if (oAcro7)
	  return true;
	}
	catch(e) {}
	}
}

function promptDigfunc(excelForm,target){	
	if(parent.SYSTEM.promptPDFDig != 0 ||!target){
		excelForm.trigger('submit');
	}else{		
		$.dialog({
			title : "温馨提示",
			content : '为保证您能正常打印，请先下载安装Adobe <a href="http://xiazai.zol.com.cn/detail/13/122361.shtml" target="_blank">PDF阅读器！',
			icon: 'confirm.gif',
			max : false,
			min : false,
			cache : false,
			lock: true,
			button: [{
				id: 'confirm',
				name: "不再提示",
				focus: true,
				callback: function() {					
					$.post("/bs/systemprofile?m=updateSystemParam3",
						{promptPDFDig:1},function(){
							excelForm.trigger('submit');
							parent.SYSTEM.promptPDFDig=1;
					});				
			    	
				}
			},{
				id: 'cancel',
				name: "跳过",
				callback: function() {					
					excelForm.trigger('submit');			    	
				}	
			}]
		});
  }
};
/**
	*导出PDF EXCEL文件 op 1打印列表 2打印凭证 3导出
*/
Business.exportFile = function(opts){
	var dataField = opts.dataField.join('#'), columnTitle = opts.columnTitle.join('#'),sheetName = opts.sheetName,
		 $excelForm = $('#excel-form'), data = opts.data, paramStr = '', url;
	if ($excelForm.length < 1) {
		var formHtml = [
			'<form  method="post" id="excel-form" target="_blank" style="display:none;">',
			'<input type="hidden" name="dataField" id="dataField" />',
			'<input type="hidden" name="columnTitle" id="columnTitle" />',
			'<input type="hidden" name="sheetName" id="sheetName"/>',
			'</form>'
		].join('');
		$excelForm= $(formHtml).appendTo('body');
	};
	if(opts.target){		
		/**
		if(navigator.appName == "Microsoft Internet Explorer" && document.documentMode>8 || navigator.appName != "Microsoft Internet Explorer"){
		   if(!isAcrobatPluginInstall()){			
				Public.tips({type:1, content : "你没有安装Adobe AcrobatPDF插件，请安装！"});
		   }
		}
		*/		
		$excelForm.attr('target', opts.target);
	}else{
		$excelForm.removeAttr('target');
	}	
	$('#dataField').val(dataField);
	$('#columnTitle').val(columnTitle);
	$('#sheetName').val(sheetName);
	for (var k in data){
		paramStr += '&' + k + '=' + data[k];
	}
	url = encodeURI(encodeURI(opts.url + paramStr + '&op=' + opts.op));
	$excelForm.attr('action', url);
	promptDigfunc($excelForm,opts.target);
//	$excelForm.trigger('submit');
};

Public.getDefaultPage = function(){
	var win = window.self;
	do{
		if (win.IS_KUAIJI3_DEFAULT_PAGE) {
			return win;
		}
		win = win.parent;
	} while(true);
};

//获取文件
Business.getFile = function(url, args, isNewWinOpen){
	if (typeof url != 'string') {
		return ;
	}
	var url = url.indexOf('?') == -1 ? url += '?' : url;
	url += '&random=' + new Date().getTime();
	var downloadForm = $('form#downloadForm');
	if (downloadForm.length == 0) {
		downloadForm = $('<form method="post" />').attr('id', 'downloadForm').hide().appendTo('body');
	} else {
		downloadForm.empty();
	}
	downloadForm.attr('action', url);
	for( k in args){
		$('<input type="hidden" />').attr({name: k, value: args[k]}).appendTo(downloadForm);
	}
	if (isNewWinOpen) {
		downloadForm.attr('target', '_blank');
	} else{
		var downloadIframe = $('iframe#downloadIframe');
		if (downloadIframe.length == 0) {
			downloadIframe = $('<iframe />').attr('id', 'downloadIframe').hide().appendTo('body');
		}
		downloadForm.attr('target', 'downloadIframe');
	}
	downloadForm.trigger('submit');
};



//判断:当前元素是否是被筛选元素的子元素
$.fn.isChildOf = function(b){
    return (this.parents(b).length > 0);
};

//判断:当前元素是否是被筛选元素的子元素或者本身
$.fn.isChildAndSelfOf = function(b){
    return (this.closest(b).length > 0);
};

//数字输入框
$.fn.digital = function() {
	this.each(function(){
		$(this).keyup(function() {
			this.value = this.value.replace(/\D/g,'');
		})
	});
};

/*初始化文本框、textarea
**@param {String, jQuery Object} 文本框对象
*/
function initInput(obj){
	var def_cls = 'ui-input-def';
	if(typeof obj == 'string') obj = $(obj);

	obj.focus(function(){
		if($.trim(this.value) == this.defaultValue){
			this.value = '';
		}
		$(this).removeClass(def_cls);
	}).blur(function(){
		var val = $.trim(this.value);
		if(val == '' || val == this.defaultValue){
			$(this).addClass(def_cls);
		}
		val == '' && $(this).val(this.defaultValue);
	});
}

function numZeroFmatter(val, opt, row){	
	val  = fmoney(val,2);
	val = val == "0" ? "&nbsp;" : val;	
	return val;	
};

/** 
* 金额保留两位小数处理(总账)
* @param cellvalue 需要格式化的字符串
*/ 
function formatForDecimal(cellvalue) {
	if(typeof cellvalue == 'number') {
		return numZeroFmatter(cellvalue);
	}
	$value = $(cellvalue);
	var valueStr = "";
	$value.each(function() {
		var result = fmoney(parseFloat($(this).text()), 2);	//保留两位小数
		$(this).text((result == 0) ? " " : result); 
		valueStr += this.outerHTML;
	});
	valueStr = valueStr.replace(/[\r\n]/g, ""); 	//IE下去除换行符
	return valueStr == "" ? "&nbsp;" : valueStr;
};

/**
 * 金额格式转浮点数
 * @param amount
 * @returns
 */
function moneyToFloat(amount) {
	amount = parseFloat((amount + "").replace(/[,]/g, ""));
	return amount;
}

/** 
* 数字格式化
* @param s 需要格式化数字
* @param n 取小数点后位数 
* @type int 
* @returns 字符在数组中的位置，没找到返回'--'
*/ 
function fmoney(s, n){  
   var flag='0';
   if(!s || s==""){
     return '0';
   }   
    s=s.toString();
   //记录负号标志
   if (s.substring(0,1)=='-')	{
   		s=s.substring(1,s.length);		   		
   		flag='1';
   	}
   
	   n = n >= 0 && n <= 20 ? n : 2;
	   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";			   			     
	   var l = s.split(".")[0].split("").reverse(),
	   r = s.split(".")[1];
	   t = "";
	   for(var i = 0; i < l.length; i ++ )
	   {
	      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	   }
	   
	   var result=t.split("").reverse().join("");
	   if(n>0){
			result += "." + r;
		}
	   if (flag==1) result="-"+result;
	   var  re=/^(\-)?0.0+$/;  
	   if(re.test(result)){
	   	result="0";
	   }
   return result;
}


/** 
* 根据分辨率设置布局
* ps:请勿改成jquery写法，jquery写法在ie6下无效
*/ 
Public.changeStyleByScreen = function(){
	if(screen.width <= 1024){
		var link = document.createElement('link');
		link.setAttribute('rel','stylesheet');
		link.setAttribute('type','text/css');
		link.setAttribute('href','../css/layout-1024.css');
		document.getElementsByTagName('head')[0].appendChild(link);
	}
};

$(function(){
	//菜单按钮
	$('.ui-btn-menu .menu-btn').bind('click',function(e){
		if($(this).hasClass("ui-btn-dis")) {
			return false;
		}
		$(this).parent().toggleClass('ui-btn-menu-cur');
		$(this).blur();
		e.preventDefault();
	});
	$(document).bind('click.menu',function(e){
		var target  = e.target || e.srcElement;
		$('.ui-btn-menu').each(function(){
			var menu = $(this);
			if($(target).closest(menu).length == 0 && $('.con',menu).is(':visible')){
				 menu.removeClass('ui-btn-menu-cur');
			}
		})
	});
});


Public.bindEnterSkip = function(obj, func){
	var args = arguments;
	$(obj).on('keydown', 'input:visible:not(:disabled)', function(e){
		if (e.keyCode == '13') {
			var inputs = $(obj).find('input:visible:not(:disabled)');
			var idx = inputs.index($(this));
			idx = idx + 1;
			if (idx >= inputs.length) {
				if (typeof func == 'function') {
					var _args = Array.prototype.slice.call(args, 2 );
					func.apply(null,_args);
				}
			} else {
				inputs.eq(idx).focus();
			}
		}
	});
};

Public.ajaxSuccessCallback = function(opts){
	var data = opts.data, successCallback = opts.successCallback, failCallback = opts.failCallback, parentOpen = opts.parentOpen;
	var status = data.status;
	var tips = Public.tips, dialog = $.dialog;
	if (parentOpen) {
		tips = parent.Public.tips;
		dialog = parent.$.dialog;
	}
	if (status == 200) {
		tips({content : data.msg});
		if ($.isFunction(successCallback)) {
			successCallback(data.data);
		}
	} else {
		if (status == 6001 || status == 6002) {
			dialog({
				title: '系统提示',
				icon: 'alert.gif',
				fixed: true,
				lock: true,
				resize: false,
				ok: true,
				content: data.msg
			});
		} else {
			tips({type:1, content : data.msg});
		}
		if ($.isFunction(failCallback)) {
			failCallback(data.data);
		}
	}
};

// jQuery Cookie plugin
$.cookie = function (key, value, options) {
    // set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    // get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

$(document).click(function(e){
	if(location.href.indexOf('default.jsp') === -1) {
		$(window.parent.document).find(".l-tab-menu").hide(); 
	}
});

$.fn.artTab = function(options) {
  var defaults = {};
  var opts = $.extend({}, defaults, options);
  var callback = opts.callback || function () {};
  this.each(function(){
	  var $tab_a =$("dt>a",this);
	  var $this = $(this);
	  $tab_a.bind("click", function(){
		  var target = $(this);
		  target.siblings().removeClass("cur").end().addClass("cur");
		  var index = $tab_a.index(this);
		  var showContent = $("dd>div", $this).eq(index);
		  showContent.siblings().hide().end().show();
		  callback(target, showContent, opts);
	  });
	  if(opts.tab)
		  $tab_a.eq(opts.tab).trigger("click");
	  if(location.hash) {
		  var tabs = location.hash.substr(1);
		  $tab_a.eq(tabs).trigger("click");
	  }
  });	  
};


//权限验证
Business.verifyRight = function(rightId){
	var systemData = Public.getDefaultPage().SYSTEM;
	var isAdmin = systemData.isAdmin;
	var rights = systemData.rights;
	//console.log(rights);
	//console.log(rightId);
	var isHasRight = false;
	if (isAdmin) {return true;}
	for (var i = 0, length = rights.length; i <length; i++) {
		if (rights[i].frightid == rightId) {
			isHasRight = true;
			break ;
		}
	}
	if (!isHasRight) {
		var html = [
			'<div class="ui-dialog-tips">',
			'<h4 class="tit">您没有该功能的使用权限哦！</h4>',
			'<p>请联系账套管理员 <em>' + systemData.adminRealName + '</em> 为您授权！</p>',
			//'<p><a href="#">查看我的权限&gt;&gt;</a></p>',
			'</div>'
		].join('');
		$.dialog({
			width: 300,
			title: '系统提示',
			icon: 'alert.gif',
			fixed: true,
			lock: true,
			resize: false,
			ok: true,
			content: html
		});
		return false;
	}
	return true;
}

//文本列表滚动
Public.txtSlide = function(opt){
	var def = {
		notice: '#notices > ul',
		size: 1, //显示出来的条数
		pause_time: 5000, //每次滚动后停留的时间
		speed: 'normal', //滚动动画执行的时间
		stop: true //鼠标移到列表时停止动画
	};
	opt = opt || {};
	opt = $.extend({}, def, opt);

	var $list = $(opt.notice),
		$lis = $list.children(),
		height = $lis.eq(0).outerHeight() * opt.size,
		interval_id;
	if($lis.length <= opt.size) return;
	interval_id = setInterval(begin, opt.pause_time);

	opt.stop && $list.on({
		'mouseover': function(){
			clearInterval(interval_id);
			$list.stop(true,true);
		},
		'mouseleave': function(){
			interval_id = setInterval(begin, opt.pause_time);
		}
	});

	function begin(){
		$list.stop(true, true).animate({marginTop: -height}, opt.speed, function(){
			for(var i=0; i<opt.size; i++){
				$list.append($list.find('li:first'));
			}
			$list.css('margin-top', 0);
		});
	}
}

//限制只能输入允许的字符，不支持中文的控制
Public.limitInput = function(obj,allowedReg){
    var ctrlKey = null;
    obj.css('ime-mode', 'disabled').on('keydown',function(e){
        ctrlKey = e.ctrlKey;
    }).on('keypress',function(e){
        allowedReg = typeof allowedReg == 'string' ? new RegExp(allowedReg) : allowedReg;
        var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode; 
        var keyChar = $.trim(String.fromCharCode(charCode));
        if(!ctrlKey && charCode != 0 && charCode != 13 && !allowedReg.test(keyChar)){
            e.preventDefault();
        } 
    });
}

   function unpopEvent( e )
		{
			try
				{
					//阻止事件冒泡调用
					if (window.event) 
					{//IE
						window.event.cancelBubble=true;
					} 
					else 
					{ //FF
						e.stopPropagation();
					}
				}catch(ex)
				{ 
				}
		}
 
 //验证手机号码		
 function checkMobile(mobile)
 {
  var isMobile=/^(0?|\+86?)(13|14|15|18|17)\d{9}$/; 
  return isMobile.test($.trim(mobile));

 }
 
 function checkpwd(pwd)
 {
 	 var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
 	  return reg.test($.trim(pwd));
 }
 //验证座机号码
 function checkPhone(phone)
 {  
//  var isPhone=/^(86)?(0\d{2,3})?(-)?(\d{7,8})((-|#)(\d{3,}))?$/;
	 var isPhone = /^(86)?(0\d{2,3})(-)?(\d{7,8})((-|#|a)(\d{3,}))?$/;
  return isPhone.test($.trim(phone)); 
 }
//验证400号码，如 400-6626-288 
 function checkFour(phone)
 {  
  var isPhone=/^(400)(-)?(\d{3,4})(-)?(\d{3,})?$/;
  return isPhone.test($.trim(phone)); 
 }
//验证800号码，如 800-6626-288 
 function checkEight(phone)
 {  
  var isPhone=/^(800)(-)?(\d{3,4})(-)?(\d{3,})?$/;
  return isPhone.test($.trim(phone)); 
 }
 
 /** 
  * Check email format 
  */  
 function emailCheck(email) {  
     var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
     if (!pattern.test(email)) {  
         return false;  
     }  
     return true;  
 }  
 
 //去除空格
 function trimStr(objStr){
	 if(objStr!=null){
		 return objStr.replace(/(^\s*)|(\s*$)/g, ''); 
	 }else{
		 return objStr;
	 }
 }
 
 //替换字符
 function replace(obj,oldStr,newStr)
 {
    var re=new RegExp(oldStr,"g");
    var newstart=obj.replace(re,newStr);
   	return newstart;
 }