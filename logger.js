var config = require('./config');
var winston = require('winston');
require('winston-papertrail').Papertrail;


module.exports = (function setup_logging() {
  // Logging to papertrail
  if (config.papertrailHost && config.papertrailPort) {
    var logger = new (winston.Logger)({
        transports: [
          new (winston.transports.Papertrail)({
            host: config.papertrailHost,
            port: config.papertrailPort
          })
        ]
    });
    logger.info("Logging to Papertrail.")
    return logger;
  } else {
    return console;
  }
})()
