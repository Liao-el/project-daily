/**
 * webSocket 通讯
 */
import { ref, computed, onBeforeUnmount } from 'vue'; // vue 3.0

export default function () {
    let cback;
    let wsuri;
    let socketUser = {};
    let timer;

    function getWebIP() {
        return window.location.host;
    }

    if (getWebIP().indexOf('localhost') !== -1 || getWebIP().indexOf('192.168.') !== -1 || getWebIP().indexOf('127.0.0.1') !== -1) {
        wsuri = 'wss://本地服务url/webSocket'; // 本地服
    } else {
        wsuri = 'wss://' + getWebIP() + '/mgr/webSocket'; // 线上
    }

    let ws = new WebSocket(`${wsuri}/${otherParams}`);

    ws.onopen = function (e) {
        console.log('链接成功');
        timer = setInterval(() => {
            let msg = {
                deviceSn: '',
                type: 'heartbeat',
                value: '',
                time: new Date().getTime(),
            };

            sendSock(msg);
        }, 1000 * 50);
    };

    ws.onmessage = function (e) {
        let res = JSON.parse(e.data);

        if (res.type == 'get_sip_info') {
            if (res.code == 200) {
                socketUser = res.data;
            } else {
                console.log(res.message || '网络错误,请重试！');
            }
        } else if (res.type == 'video_call_start' || res.type == 'ma_open_rtsp') {
            cback(res);
        }
    };

    ws.onclose = function (e) {
        console.log('断开链接');
    };

    const sendSock = (agentData, callback) => {
        cback = callback;
        if (ws.readyState === ws.OPEN) {
            //若是ws开启状态
            websocketsend(agentData, callback);
        } else if (ws.readyState == 2 || (ws.readyState == 3 && ws.readyState === ws.CONNECTING)) {
            // 若是 正在开启状态，则等待2s后重新调用
            setTimeout(function () {
                sendSock(agentData, callback);
            }, 2 * 1000);
        } else {
            // 若未开启 ，则等待2s后重新调用
            setTimeout(function () {
                sendSock(agentData, callback);
            }, 2 * 1000);
        }
    };

    //数据发送
    function websocketsend(agentData) {
        console.log(agentData);
        ws.send(JSON.stringify(agentData));
    }

    // 页面关闭
    onBeforeUnmount(() => {
        clearInterval(timer);
        ws.close();
    });

    return {
        socketUser,
        sendSock,
    };
}
