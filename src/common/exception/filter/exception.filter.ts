import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // 💥 HttpException이 아닌 경우 InternalServerErrorException
    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const statusCode = (exception as HttpException).getStatus(); // 예외로부터 상태 코드 가져오기
    const response = (exception as HttpException).getResponse();
    const timestamp = new Date();

    const log = {
      timestamp,
      statusCode,
      response,
      url: req.url,
      originalErrorMessage: exception.message || null, // 원본 에러 메시지 추가
    };

    this.logger.error(
      `HTTP Status: ${log.statusCode} Error Message: ${log.originalErrorMessage}`,
      JSON.stringify(log),
    );

    // 클라이언트에게 상태 코드와 함께 응답
    res.status((exception as HttpException).getStatus()).json(response);
  }
}
