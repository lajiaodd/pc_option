
var homeUrl = 'http://192.168.1.9:8080'
var app = ''
//引入vue实例
function globalVue(_this) {
    app = _this
}
function post(url, params) {
    return new Promise((resolve, reject) => {
        app.$axios({
            method: 'post',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: params,
        }).then(function (res) {
                
                resolve(res)
            
        }).catch(err =>{
                reject(err)
        })
    });
}
function get(url) {
    return new Promise((resolve, reject) => {
        app.$axios({
            method: 'get',
            url: url,
            headers: {'Content-Type': 'application/json'},
            // data: params
        }).then(function (res) {
                resolve(res)
        }).catch(err =>{
                reject(err)
        })
    });
}
function patch(url, params) {
    return new Promise((resolve, reject) => {
        app.$axios({
            method: 'patch',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: params
        }).then(function (res) {
                resolve(res)
        }).catch(err =>{
                reject(err)
        })
    });
}
function put(url, params) {
    return new Promise((resolve, reject) => {
        app.$axios({
            method: 'put',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: params
        }).then(function (res) {
                resolve(res)
        }).catch(err =>{
                reject(err)
        })
    });
}
function mydelete (url) {
    return new Promise((resolve, reject) => {
        app.$axios({
            method: 'delete',
            url: url,
            headers: {'Content-Type': 'application/json'},
        }).then(function (res) {
                resolve(res)
        }).catch(err =>{
                reject(err)
        })
    });
}

//获取验证码
function getCode(url, params, _this) {
    _this.getCode.disabled = true;
    _this.getCode.txt = '获取中...';
    let seconds = 60;
    let time = setInterval(function() {
        --seconds;
        _this.getCode.txt = seconds + 's';
        if(seconds <= 0) {
            clearInterval(time);
            _this.getCode.disabled = false;
            _this.getCode.txt = '重新获取';
        }
    }, 1000)
    post(url, params).then(function(res) {
        console.log(77)
        console.log(res)
    }).catch(function(err) {
        console.log(err)
        if(err.status === 400) {
            _this.$Message.error(err.data.mobile);
        }
    })
}




export default {globalVue ,getCode, get, post,patch,put,mydelete}