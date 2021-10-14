const {isline} = require('./isline')
const {pingdnses} = require('./ping')
async function isonline(dnses) {
    return Promise.resolve(await isline(dnses || pingdnses))
}

module.exports = {
    isonline
}