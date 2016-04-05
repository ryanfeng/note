var expires =365*24 * 3600*1000 ;// 有效期
var path ="/" ;// 规定 cookie 的服务器路径
var domain ="." ;// 规定 cookie 的域名


//读取cookie 带解码
function getCookie(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
        }
        return null;
}

// 设定Cookie值
function setCookie(name, value)
{
	var expdate = new Date();
	var secure =false;// 规定是否通过安全的 HTTPS 连接来传输 cookie
	expdate.setTime(expdate.getTime() + expires);
    document.cookie = name+"="+encodeURIComponent(value)+";Expires="+expdate.toGMTString()+";path=/;";
}

// 删除Cookie
function delCookie(name)
{
	var exp = new Date();
	exp.setTime (exp.getTime() - 3600000*24);
	var cval = getCookie (name);
	document.cookie = name + "=" + cval + "; Expires="+ exp.toGMTString()+";path=/;";
}


//设置cookie
function setTimeCookie(name, value,expires)
{
	var expdate = new Date();
	var secure =false;// 规定是否通过安全的 HTTPS 连接来传输 cookie
	expdate.setTime(expdate.getTime() + expires);
    document.cookie = name+"="+encodeURIComponent(value)+";Expires="+expdate.toGMTString()+";path=/;";
}