//截取数字小数点前面的长度
function strNumSize(tempNum){ 
    var stringNum = tempNum.toString() 
    var index = stringNum.indexOf(".")
    var newNum = stringNum 
    if(index!=-1){ 
        newNum = stringNum.substring(0,index) }
        return newNum.length
}
//将数字转换汉字
let addUnit= function(num){
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
    return (m.num+m.unit)
}

let decimalize = function(num) {
    return parseInt(num)
}
let boolbeanToChinese = function (val) {
    if(val) {
        return "买"
    } else {
        return "卖"
    }
}
let directionToChinese = function (val) {
    if(val) {
        return "多头"
    } else {
        return "空头"
    }
}

let chanceMonth = function(value) {
    if(value) {
        let result = value.slice(-2)+'月';
        return result
    }
}
export default {
    addUnit,
    decimalize,
    boolbeanToChinese,
    directionToChinese,
    chanceMonth
}