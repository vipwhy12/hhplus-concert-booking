import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error.code';
import { BaseException } from './base.exception';

export class WaitingQueueExpiredException extends BaseException {
  constructor() {
    super(ErrorCode.WaitingQueueExpired, HttpStatus.BAD_REQUEST);
  }
}
