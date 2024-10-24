import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error.code';
import { BaseException } from './base.exception';

export class PointNotFoundException extends BaseException {
  constructor() {
    super(ErrorCode.PointNotFound, HttpStatus.NOT_FOUND);
  }
}
