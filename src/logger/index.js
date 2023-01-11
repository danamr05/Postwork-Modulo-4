import winston from 'winston'
import 'winston-daily-rotate-file'

export const logger = winston.createLogger({
   level: 'info',
   //format: winston.format.json(),
   format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD'}),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} | ${level} | ${message}`)
),
   defaultMeta: { service: 'user-service' },
   transports: [
      // escribimos los logs de nivel `error` o menor en `error.log`
      //new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      // escribimos los logs de nivel `info` o menor en `combined.log`
      //new winston.transports.File({ filename: 'logs/combined.log' }),
      //Uso de transporte 'DailyRotateFile' con rotacion por dia
     new winston.transports.DailyRotateFile({
        level: 'error',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '30m',
        maxFiles: '15d'
      }),
   ]
})

// si no estamos en producción, mostramos logs en la consola con el formato `simple`
if (process.env.NODE_ENV !== 'production') {
   logger.add(new winston.transports.Console({
      format: winston.format.simple(),
   }))
}

module.exports = { logger }