import Lib from './lib.js'
let ReconnectingWebSocket = require("./reconnecting-websocket.min.js")

var lockReconnect = false;
let app = ''
//连接行情websoket
function initWebSocket(_this) { //初始化weosocket
    app = _this
    const wsurl = `ws://${Lib.ip}/ws/chat/50ETF/` //这个地址由后端童鞋提供
    let options = {
        maxReconnectAttempts: 100
    }
    app.websock = new ReconnectingWebSocket(wsurl, null, options);
    app.websock.onmessage = websocketonmessage;
    app.websock.onopen = websocketonopen;
    app.websock.onerror = websocketonerror;
    app.websock.onclose = websocketclose;

}

function websocketonopen() { //连接建立之后执行send方法发送数据
    heartCheck.reset().start();
}

function websocketonerror() { //连接建立失败重连
    
}

function websocketonmessage(e) {
    let data = JSON.parse(JSON.parse(e.data).message).result

    //取月份
    let list_month = [];
    let market_data = [];

    data.forEach((v, i) => {
        for(let v2 in v) {
            list_month.push(v2)
            market_data.push(v[v2])
        }       
    })

    // console.log(list_month)
    // console.log(market_data)
    
    //业务需求，将socket接收到的值存进vuex
    app.$store.dispatch('RESET_ID')
    app.$store.dispatch("SAVE_MARKET", {list_month, market_data})
}

function websocketsend(Data) { //数据发送
    // this.websock.send(Data)
}

function websocketclose(e) { //关闭

    console.log('断开连接', e)
}
var heartCheck = {
    timeout: 8000,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function(){
        var self = this;
        this.serverTimeoutObj = setInterval(function(){
            if(app.websock.readyState == 1){
                app.websock.send(JSON.stringify({
                    'message': 'ping'
                }));
                heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
            }
        }, this.timeout)
    }
};
export default initWebSocket