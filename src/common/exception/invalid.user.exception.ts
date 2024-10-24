import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error.code';
import { BaseException } from './base.exception';

export class InvalidUserException extends BaseException {
  constructor() {
    super(ErrorCode.UserInvaild, HttpStatus.NOT_FOUND);
  }
}
