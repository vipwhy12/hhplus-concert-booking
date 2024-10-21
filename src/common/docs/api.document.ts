import { DocumentBuilder } from '@nestjs/swagger';

export class apiDocument {
  public initializeOptions() {
    return new DocumentBuilder()
      .setTitle('콘서트 예약 서비스')
      .setDescription('HDD 콘서트 예약 서비스 API 문서입니다.')
      .setVersion('1.0.0')
      .addTag('concert')
      .build();
  }
}
