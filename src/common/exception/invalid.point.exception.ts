import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error.code';
import { BaseException } from './base.exception';

export class InvalidPointException extends BaseException {
  constructor() {
    super(ErrorCode.PointInvaild, HttpStatus.NOT_FOUND);
  }
}
