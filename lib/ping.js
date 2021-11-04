const { spawn } = require('child_process')
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
            // console.log('sp-isoffline:::', code);
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



module.exports = {
    _ping,
    ping,
    pingdnses: [
        'www.baidu.com',
        'weixin.qq.com',
        // 'www.chinanews.com',
    ]
}