'use strict'
function getHeadTitle(app, title) {
    app.$nextTick(function() {
        var dom = document.getElementsByClassName('mu-appbar-title')[0];  
            if(dom)   {
                dom.innerHTML = title       
            }  
    })
}
//获取url后面参数
function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
} 
//数字转换汉字
function unitConvert(num) { 
    var moneyUnits = ["", "万", "亿", "万亿"] 
    var dividend = 10000 
    var curentNum = Number(num)//转换数字 
    var curentUnit = moneyUnits[0] //转换单位
    for (var i = 0; i <4; i++) { 
        curentUnit = moneyUnits[i] 
        if(strNumSize(curentNum)<5){
            break; 
        } 
        curentNum = curentNum / dividend 
    } 
    var m = {num: 0, unit: ""}
    m.num = curentNum.toFixed(2)
    m.unit = curentUnit 
    return m
}
//返回整数的长度
function strNumSize(tempNum){ 
    var stringNum = tempNum.toString() 
    var index = stringNum.indexOf(".")
    var newNum = stringNum 
    if(index!=-1){ 
        newNum = stringNum.substring(0,index) }
        return newNum.length
}
//判断任一个数值接近数组中的某个值
function approach(arr, num){
    var newArr = [];
    arr.map(function(x){
        // 对数组各个数值求差值
        newArr.push(Math.abs(x - num));
    });
    // 求最小值的索引
    var index = newArr.indexOf(Math.min.apply(null, newArr));
    return arr[index];
}

//数组对象转二维数组
function  array_objiect_to_array(scoreObject) {
    var arr6=[];
    scoreObject.forEach(item => {
        var arr7=[];
        for(var j in item){ 
            arr7.push(item[j]);
        }
        arr6.push(arr7);
    })
    console.log(arr6);
    return arr6.reverse()
}

let time = 5000
function setTime(callback, timer) {
    let app = this
    // clearInterval(app.mytimer)
    callback()
    timer = setInterval(function() {
        callback()      
    }, time)
}


function clearTime(timer) {
    window.clearInterval(timer)
}

import IdentityCodeValid from './IdentityCodeValid'
let Lib = {
    phoneRex:/^[1][3-9][0-9]{9}$/,
    smsCodeRex:/^[0-9]{6}$/,
    passWordRex:/^[0-9a-zA-Z]{6,20}$/,
    idCardRex:/^[0-9]{17}(0-9|x|X)$/,
    // host:'http://192.168.101.2:8080',
    // ip: '192.168.101.2:8080',
    //模拟后端路由
    // ip: '47.102.131.83',
    // host:`http://47.102.131.83`,
    //实盘后端路由
    // ip: '47.103.37.254',
    // host:`47.102.131.83`,


};

if(process.env.NODE_ENV == "development") {
    Lib.ip = '47.103.37.254'
    Lib.host = 'http://47.103.37.254'
}else {
    let current_host = window.location.host //返回url主机部分

    if(process.env.REAL_HOST.indexOf(current_host) !== -1)  {    //  真实账户
        Lib.ip = '47.103.37.254'
        Lib.host = 'http://47.103.37.254'
    } else { //  模拟账户
        Lib.ip = '47.102.131.83'
        Lib.host = '47.102.131.83'
    }

}


Lib.identityCodeValid = IdentityCodeValid
Lib.getHeadTitle = getHeadTitle
Lib.unitConvert = unitConvert
Lib.strNumSize = strNumSize
Lib.array_objiect_to_array = array_objiect_to_array
Lib.setTime = setTime
Lib.clearTime = clearTime
export default Lib


