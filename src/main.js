// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import store from './store'
import filters  from './style/filter.js'
// import initWebSocket from './style/market.js'
// import {initTradeWebSocket, websocketsend} from './style/trade.js'
import VueQriously from 'vue-qriously'
import VueClipboards from 'vue-clipboards';
import Lib from './style/lib.js'
import Api from './style/api.js'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './my-theme/index.less';
import layer from 'vue-layer'
import echarts from 'echarts' //引入echarts

// import "../static/css/layer.css";

var sd = require('silly-datetime');


Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueQriously)
Vue.use(VueClipboards)

Vue.prototype.$axios = axios;
Vue.prototype.$lib = Lib;
Vue.prototype.$api = Api;
// Vue.prototype.$initTradeWebSocket = initTradeWebSocket 
// Vue.prototype.$websocketsend = websocketsend 
Vue.prototype.$sd = sd //格式时间日期
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$echarts = echarts //引入组件


Object.keys(filters).forEach(key => {  
    Vue.filter(key, filters[key])  
}) 

// console.log(window.location.href)
// console.log(window.location.host)
// axios.defaults.baseURL = 'http://192.168.101.3:8082/';
if(process.env.NODE_ENV == "development") {
    axios.defaults.baseURL = process.env.HOST;
}else {
    
    let current_host = window.location.host //返回url主机部分

    if(process.env.REAL_HOST.indexOf(current_host) !== -1)  {//  真实账户
        axios.defaults.baseURL = process.env.REAL_HOST;
    } else {//  模拟账户
        axios.defaults.baseURL = process.env.SIMULATE_HOST;
    }

}
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 添加请求拦截器，在请求头中加token
console.log("localStorage.getItem('TOKEN')")
console.log(localStorage.getItem('TOKEN'))
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('TOKEN')) {
            config.headers.Authorization =`JWT ${localStorage.getItem('TOKEN')}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    console.log(401)
                    // router.replace({
                    //     path: '/login',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // });
                    break;
                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面
                case 403:
                    api.showMsg("登录过期，请重新登录")

                    // 清除token
                    localStorage.removeItem('TOKEN');
                    store.commit('changeLogin', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                    // 404请求不存在
                case 404:
                    api.showMsg("网络请求不存在")

                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    
                    // layer.open({
                    //     content: error.response.data.message,
                    //     skin: 'msg',
                    //     time: 2 //2秒后自动关闭
                    // });
            }
            return Promise.reject(error.response);
        }
    }
);

//在new Vue之前使用
router.beforeEach((to, from, next) => {

    /* 路由发生变化修改页面title */
    if (to.name) {
        document.title = to.name
    }

    if ( to.matched.some(record => record.meta.requiresAuth) && (!localStorage.getItem('TOKEN') || String(localStorage.getItem('TOKEN')).length == 4)) {
        
        let c = new Vue();
        c.$layer.confirm(
            '还未登录，是否现在登录',
            function(index) {
                next({
                    path: '/login',

                })
                c.$layer.close(index)
            }
        );
        
    }else {
        next()
    }

})

/* eslint-disable no-new */
window.app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    created() {
        // initWebSocket(this)
        this.$api.globalVue(this)
    },
    template: '<App/>'
})

//连接行情数据
getMarketData()
function getMarketData() {
    app.$api.get(`${app.$lib.host}/websocket/get_hq`)
    .then(function(res) {
        // console.log(8888888888)
        if(res.status == 200) {
            let data = JSON.parse(res.data).result
            storeData(data)
            setTimeout(() => {
                getMarketData()
            }, 1000);
            
            // console.log(JSON.parse(res.data).result)
            
        }
    }).catch(function(err) {
        console.log(err)
    })
}

function storeData(data) {
    // let a =sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    // console.log(a);
    
    //取月份
    let list_month = [];
    let market_data = [];

    data.forEach((v, i) => {
        for(let v2 in v) {
            list_month.push(v2)
            market_data.push(v[v2])
        }       
    })

    //业务需求，将socket接收到的值存进vuex
    app.$store.dispatch('RESET_ID')
    app.$store.dispatch("SAVE_MARKET", {list_month, market_data})
}


// 检测本地是否有token
if(localStorage.getItem('TOKEN') && String(localStorage.getItem('TOKEN')).length !== 4){
    store.state.token = localStorage.getItem('TOKEN');
    store.dispatch('getUserInfo')
    .then(function() {
        // initTradeWebSocket(app.$store.state.user.username, app)
    })

    //实时更新用户信息
    setInterval(function() {
        store.dispatch('getUserInfo');
    }, 1000)
}else {
    console.log(999)
}
