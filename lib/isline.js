const {pingdnses, ping} = require('./ping')

module.exports = {
    async isline(dnses = pingdnses) {
        let allis = await ping(dnses);
        return allis.includes(true)
    }
}