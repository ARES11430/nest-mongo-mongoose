import * as winston from 'winston'
import 'winston-mongodb'

import { ENV, MONGO_URI, MONGO_URI_TEST, MONGO_URI_FALLBACK } from '../config/configs'

let MONGO: string

if (ENV === 'production') {
    MONGO = MONGO_URI
} else if (ENV === 'development') {
    MONGO = MONGO_URI_TEST
} else MONGO = MONGO_URI_FALLBACK

// * winston config
export const winstonConfig = {
    transports: [
        new winston.transports.File({
            filename: 'log-Errors.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
        new winston.transports.File({
            filename: 'log-Info.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
        new winston.transports.Console({
            level: 'silly',                             // * output all levels including debug
            handleExceptions: true,                     // * log uncaught exceptions
            format: winston.format.combine(
                winston.format.colorize(),              // * add color to the console output
                winston.format.cli()                    // * use a simple output format
            ),
        }),
        new winston.transports.MongoDB({
            db: MONGO,
            level: 'error',
            options: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
    ]
}