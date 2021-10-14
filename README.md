# sp-isoffline
1. is online on nodejs by ping hosts: www.baidu.com, weixin.qq.com...
2. offline to online on nodejs 

## Install
`npm install sp-isoffline`
or
`yarn add sp-isoffline`

## api
### isonline: 
`网络是否处于在线状态(一次性（ one-off ）) code: `
```js
import {isonline} from 'sp-isoffline'

/*
 * dnses: [...]
 */
isonline().then(status => {
    if(status) {
        // online
    }else {
        // offline
    }
})
```

### offlineListener：
`网络监听器， 默认三秒 轮询 code：`

```js 
offlineListener({
    time: 1000, // 间隔
    // interval: 9, // 次数
    offline(callback) { // 网络断开
        console.log('网络断开')
        callback(({ status }) => {
            if (status) console.log('联网成功')
            else console.log('网络连接失败')
        })
    },
    online({ status }) { // 网络正常情况下
        if (status) console.log('网络正常')
    }
})
```
