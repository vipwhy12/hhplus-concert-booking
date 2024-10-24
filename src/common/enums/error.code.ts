export enum ErrorCode {
  //01: Payment
  PointNotFound = '0100',
  PointFailed = '0101',
  PointInvaild = '0102',
  PointUpdateFailed = '0103',

  //03. User
  UserInvaild = '0302',

  //04: Waiting Queue
  WaitingQueueExpired = '0405',

  //05: Session
  SessionNotFound = '0500',

  //06: Seat
  SeatNotAvailable = '0603',
  SeatUpdateFailed = '0604',
}
