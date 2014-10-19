var config = {
    /* Local webserver port
     * Use 8080 here to make services available on port 80 (http)
     * and 8433 to make services available on port 443 (https) */
    listenPort: 8080,
    /* http or https */
    listenProtocol: 'http',
    /* SSL configuration for https, leave undefined for http */
    /*sslKey: require('fs').readFileSync('key.pem'),
    sslCert: require('fs').readFileSync('cert.pem'),*/
    /* Host & Credentials for accessing the GoodsCloud API */
    goodscloudHost: 'http://sandbox.goodscloud.com',
    goodscloudPort: 80,
    goodscloudUsername: '',
    goodscloudPassword: 'secret',
    /* Syslog target */
    papertrailHost: undefined,
    papertrailPort: undefined,
}

module.exports = config;
