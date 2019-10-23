//解析设备
const parseDevices = devicesJson => {
    var devices = []
    var _devicesJson = devicesJson
    if (_devicesJson) {
        _devicesJson = _devicesJson.replace('\r', '')
        _devicesJson = _devicesJson.split('\n');
    }
    var item = {}
    if (_devicesJson && devicesJson.length > 0) {
        _devicesJson.forEach(function (element, index) {
            switch (index % 3) {
                case 0:
                    item.name = element ? element.split(':')[1] ? element.split(':')[1] : element.split('：')[1] : ''
                    break;
                case 1:
                    item.type = element ? element.split(':')[1] ? element.split(':')[1] : element.split('：')[1] : ''
                    break;
                case 2:
                    item.num = element ? element.split(':')[1] ? element.split(':')[1] : element.split('：')[1] : ''
                    devices.push(JSON.stringify(item))
                    break;
                default:
                    break;
            }
        });
        var _devices = []
        for (var i = 0; i < devices.length; i++) {
            _devices.push(JSON.parse(devices[i]))

        }
        return _devices
    }
}
//验证手机号
const checkPhoneNo = phoneNo => {
    return /^1\d{10}$/gi.test(phoneNo);
}
//校验密码
const checkPassword = passwprd => {
    return /^[a-zA-Z0-9]{6,20}$/.test(passwprd);
}
//校验邮箱
const checkEmail = email => {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return myreg.test(email)
}
const isPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}
const isAndroid = () => {
    var u = navigator.userAgent, app = navigator.appVersion;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
}
const isIOS = () => {
    var u = navigator.userAgent, app = navigator.appVersion;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}
//日期转字符串
const formatDate = (date, format) => {
    var args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
}
//字符串转日期
const formatToDate = str => {
    return new Date(Date.parse(str.replace(/-/g, "/")));
}
/**
 * 数字金额转换为大写人民币汉字
 * @param {*} money 
 */
const menoyToUppercase = money => {
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');	 //汉字的数字
    var cnIntRadice = new Array('', '拾', '佰', '仟'); //基本单位
    var cnIntUnits = new Array('', '万', '亿', '兆');  //对应整数部分扩展单位
    var cnDecUnits = new Array('角', '分', '毫', '厘'); //对应小数部分单位
    var cnInteger = '整';	//整数金额时后面跟的字符			
    var cnIntLast = '元';	//整数完以后的单位
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    var integerNum;	 //金额整数部分
    var decimalNum;	 //金额小数部分
    //输出的中文金额字符串
    var chineseStr = '';
    var parts;		//分离金额后用的数组，预定义
    if (money == '') { return ''; }

    money = parseFloat(money);
    if (money >= maxNum) {
        //超出最大处理数字
        return '超出最大处理数字';
    }
    if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }

    //四舍五入保留两位小数,转换为字符串
    money = Math.round(money * 100).toString();
    integerNum = money.substr(0, money.length - 2);
    decimalNum = money.substr(money.length - 2);

    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '' || /^0*$/.test(decimalNum)) {
        chineseStr += cnInteger;
    }
    return chineseStr;
},
/**
 * url拼接参数
 * @param {} url
 * @param {} params
 */
const addUrlParam = (url, params) => {
    var that = this
    that.each(params, function (index, item) {
        if (!that.getQueryString(index)) {
            if (url.indexOf("?") >= 0) {
                url = url + "&" + index + "=" + item;
            } else {
                url = url + "?" + index + "=" + item;
            }
        } else {
            url = that.changeURLArg(url, index, item)
        }
    })
    return url;
}
/**
 * 替换url参数
 * @param {*} url 
 * @param {*} arg 
 * @param {*} arg_val 
 */
const changeURLArg = (url, arg, arg_val) => {
    var re = eval('/(' + arg + '=)([^&]*)/g');
    var nUrl = url.replace(re, arg + '=' + arg_val);
    return nUrl
}
/**
 * 删除url参数
 * @param {*} url 
 * @param {*} param 
 */
const delUrlParam = (url, param) => {
    // 如果不包括此参数
    if (url.indexOf(param) == -1)
        return url;

    var arr_url = url.split('?');

    var base = arr_url[0];

    var arr_param = arr_url[1].split('&');

    var index = -1;

    for (i = 0; i < arr_param.length; i++) {

        var paired = arr_param[i].split('=');

        if (paired[0] == param) {

            index = i;
            break;
        }
    }

    if (index == -1) {
        return url;
    } else {
        arr_param.splice(index, 1);
        return base + "?" + arr_param.join('&');
    }
}
//获取url参数
const getQueryString = name => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
const getQueryString2 = name => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
}
//设置cookie
const setCookie = (c_name, value, expire) => {
    var date = new Date()
    date.setSeconds(date.getSeconds() + expire)
    document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString() + "; path=/"
    console.log(document.cookie)
}
//获取cookie值
const getCookie = c_name => {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            var c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
const clearCookie = c_name => {
    this.setCookie(c_name, '', 365 * 24 * 60 * 60)
}
//是否在微信环境
const isWeixin = () => {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
}

//生成n-m的随机数
const rnd =  (n, m)=> {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
}

export {
    parseDevices,
    checkPhoneNo,
    checkPassword,
    checkEmail,
    isPC,
    isAndroid,
    isIOS,
    formatDate,
    formatToDate,
    menoyToUppercase,
    addUrlParam,
    changeURLArg,
    delUrlParam,
    getQueryString,
    getQueryString2,
    setCookie,
    getCookie,
    clearCookie,
    isWeixin,
    rnd,
}