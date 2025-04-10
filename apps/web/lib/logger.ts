// lib/logger.ts
import winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const logtail = new Logtail('your-logtail-source-token');

const logger = winston.createLogger({
  transports: [new LogtailTransport(logtail)],
});

export default logger;
