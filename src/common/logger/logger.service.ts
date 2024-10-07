import { LoggerService, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class Logger implements LoggerService {
  private logFilePath = path.join(__dirname, 'logs.txt');

  /**
   * Utility function to format log messages.
   */
  private formatMessage(
    level: string,
    message: any,
    optionalParams: any[],
  ): string {
    const timestamp = new Date().toISOString();
    const params = optionalParams.length
      ? `, Params: ${JSON.stringify(optionalParams)}`
      : '';
    return `[${timestamp}] [${level}] ${message}${params}`;
  }

  /**
   * Function to write logs to file.
   */
  private writeToFile(formattedMessage: string): void {
    fs.appendFileSync(this.logFilePath, `${formattedMessage}\n`);
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessage('LOG', message, optionalParams);
    console.log(formattedMessage);
    this.writeToFile(formattedMessage);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessage(
      'FATAL',
      message,
      optionalParams,
    );
    console.error(formattedMessage);
    this.writeToFile(formattedMessage);
    // 여기서 Sentry 같은 외부 모니터링 서비스로 전송 가능
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessage(
      'ERROR',
      message,
      optionalParams,
    );
    console.error(formattedMessage);
    this.writeToFile(formattedMessage);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessage(
      'WARN',
      message,
      optionalParams,
    );
    console.warn(formattedMessage);
    this.writeToFile(formattedMessage);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessage(
      'DEBUG',
      message,
      optionalParams,
    );
    console.debug(formattedMessage);
    this.writeToFile(formattedMessage);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessage(
      'VERBOSE',
      message,
      optionalParams,
    );
    console.log(formattedMessage);
    this.writeToFile(formattedMessage);
  }
}
