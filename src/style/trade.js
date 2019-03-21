import Lib from './lib.js'
//连接交易websoket
let ReconnectingWebSocket = require("./reconnecting-websocket.min.js")
var lockReconnect = false;
let app = ''
let tradeWebsock = ''
function initTradeWebSocket(username,_this) { //初始化weosocket
    app = _this
    const wsurl = `ws://${Lib.ip}/ws/trade/${username}/` //这个地址由后端童鞋提供
    tradeWebsock = new ReconnectingWebSocket(wsurl);
    tradeWebsock.onmessage = tradewebsocketonmessage;
    tradeWebsock.onopen = websocketonopen;
    tradeWebsock.onerror = websocketonerror;
    tradeWebsock.onclose = websocketclose;

}

function websocketonopen() { //连接建立之后执行send方法发送数据
    console.log(111222);
}

function websocketonerror() { //连接建立失败重连
    // initTradeWebSocket(app.$store.state.user.username)
}

function tradewebsocketonmessage(e) {
    console.log(3333333)
    console.log(e)
    let data =  JSON.parse(e.data)
    let message = JSON.parse(data.message)
    // console.log(message)
    if(data.type == "ok") {
        app.$Message.success(message.return_msg);
    }else if(data.type == "error") {
        app.$Message.error(message.return_msg);
        console.log(566)
    }

}

function websocketsend(Data) { //数据发送
    console.log(7890077)
    console.log(Data)
    console.log(app)
    console.log(tradeWebsock)
    tradeWebsock.send(Data)
}

function websocketclose(e) { //关闭
    // app.$Modal.confirm({
    //     content: `连接建立失败,是否重连？`,
    //     okText:'重连',
    //     onOk: () => {
    //         location.reload();
    //     },
    //     onCancel: () => {

    //     }
    // });

}

export {initTradeWebSocket, websocketsend} 