import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error.code';
import { BaseException } from './base.exception';

export class SessionNotFoundException extends BaseException {
  constructor() {
    super(ErrorCode.SessionNotFound, HttpStatus.NOT_FOUND);
  }
}

export class SeatNotAvailableException extends BaseException {
  constructor() {
    super(ErrorCode.SeatNotAvailable, HttpStatus.CONFLICT);
  }
}

export class SeatUpdateFailedException extends BaseException {
  constructor() {
    super(ErrorCode.SeatUpdateFailed, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
