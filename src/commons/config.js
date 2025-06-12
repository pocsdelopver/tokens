const crypto = require('crypto')

const config = {
    secretKey: crypto.createHash('sha256').update('mi_clave_super_secreta').digest('hex'),
    port: 3000
}

module.exports = config 