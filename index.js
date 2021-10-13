
const { spawn } = require('child_process')
const pingdnses = [
    'www.baidu.com',
    'weixin.qq.com',
    'www.chinanews.com',
]

async function isline(dnses = pingdnses) {
    let allis = await ping(dnses);
    return allis.includes(true)
}
const isFunc = func => Object.prototype.toString.call(func) === '[object Function]'

function offlineListener(args = { time: 3000, interval: Infinity, detection: Infinity, offline: () => { }, online: () => { } }) {
    let { time, interval, offline, online } = args,
        status, // true || false
        _interval = 0,
        t = null;
    const reconnectCallback = (func) => { // 重连
        if (!isFunc(func)) throw Error('Arguments should be “Function”')
        siv((args) => {
            let { status } = args
            if (status) {
                clearTimeout(t);
                t = null;
                func(args);
                siv(online, true)
                return true
            } else func(args)
        })
    }

    const siv = (fn, isoff = false) => {
        t = setTimeout(async () => {
            status = await isline(pingdnses)
            let flag = fn({ status });
            if (flag) return
            if (isoff && !status) {
                clearTimeout(t);
                t = null
                offline(reconnectCallback)
                return
            }
            status = null
            _interval++
            if (_interval == interval) clearTimeout(t);
            siv(fn, isoff)
        }, isoff ? time : 1000);
    }
    siv(online, true)
}

function _ping(to) {
    let i = '';
    return new Promise(res => {
        let cp = spawn('ping', [to + ''])
        cp.stdout.on('data', data => {
            if (i == 'on') {
                i = ''
                cp.kill();
                res(true)
            }
            i = 'on'
        })
        cp.stderr.on('data', _ => {
            cp.kill();
            res(false)
        })
        cp.on('close', code => {
            // console.log('data:', code);
            res(false)
        })
    })
}

async function ping(dnses) {
    let i = 0;
    let l = dnses.length;
    let r = new Array(l);

    for (; i < l; i++) {
        r[i] = await _ping(dnses[i]);
    };
    return r
}

async function isonline(dnses) {
    return Promise.resolve(await isline(dnses || pingdnses))
}

// offlineListener({
//     time: 1000,
//     // interval: 9,
//     offline(callback) {
//         console.log('网络断开')
//         callback(({ status }) => {
//             if (status) console.log('联网成功')
//             else console.log('网络连接失败')
//         })
//     },
//     online({ status }) {
//         if (status) console.log('网络正常')
//     }
// })

// isonline().then(isonline => {
//     if(isonline) console.log('在线')
//     else console.log('离线')
// })
// export default {

// }


module.exports = {
    offlineListener,
    isonline
}