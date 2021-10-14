const {isonline} = require('./lib/isonline')
const {offlineListener} = require('./lib/offlinelistener')

offlineListener({
    time: 1000,
    // interval: 9,
    offline(callback) {
        console.log('网络断开')
        callback(({ status }) => {
            if (status) console.log('联网成功')
            else console.log('网络连接失败')
        })
    },
    online({ status }) {
        if (status) console.log('网络正常')
    }
})


module.exports = {
    offlineListener,
    isonline
}