const {isline} = require('./isline')

const {pingdnses} = require('./ping')

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

module.exports = {
    offlineListener,
    isFunc
}