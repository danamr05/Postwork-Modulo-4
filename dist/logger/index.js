"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
var _winston = _interopRequireDefault(require("winston"));
require("winston-daily-rotate-file");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = _winston.default.createLogger({
  level: 'info',
  //format: winston.format.json(),
  format: _winston.default.format.combine(_winston.default.format.timestamp({
    format: 'YYYY-MM-DD'
  }), _winston.default.format.errors({
    stack: true
  }), _winston.default.format.printf(({
    timestamp,
    level,
    message
  }) => `${timestamp} | ${level} | ${message}`)),
  defaultMeta: {
    service: 'user-service'
  },
  transports: [
  // escribimos los logs de nivel `error` o menor en `error.log`
  //new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  // escribimos los logs de nivel `info` o menor en `combined.log`
  //new winston.transports.File({ filename: 'logs/combined.log' }),
  //Uso de transporte 'DailyRotateFile' con rotacion por dia
  new _winston.default.transports.DailyRotateFile({
    level: 'error',
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '30m',
    maxFiles: '15d'
  })]
});

// si no estamos en producción, mostramos logs en la consola con el formato `simple`
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston.default.transports.Console({
    format: _winston.default.format.simple()
  }));
}
module.exports = {
  logger
};