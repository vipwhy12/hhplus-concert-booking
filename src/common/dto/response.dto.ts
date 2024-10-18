export class ResponseDto<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(data: T, statusCode: number = 200, message: string = 'success') {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
