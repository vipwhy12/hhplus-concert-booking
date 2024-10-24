import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error.code';
import { BaseException } from './base.exception';

export class PointUpdateFailedException extends BaseException {
  constructor() {
    super(ErrorCode.PointUpdateFailed, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
