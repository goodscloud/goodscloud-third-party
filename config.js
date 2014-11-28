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
    goodscloudHost: 'http://localhost:5000',
    goodscloudPort: 80,
    goodscloudUsername: 'user0@example.org',
    goodscloudPassword: 'geheim',
    /* GoodsCloud channels (numeric IDs) for which we want to receive
     * notifications; empty list selects all available channels */
    goodscloudChannels: [],
    /* Syslog target */
    papertrailHost: undefined,
    papertrailPort: undefined,
}

module.exports = config;
