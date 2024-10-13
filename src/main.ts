import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('콘서트 예약 서비스')
    .setDescription('콘서트 예약 서비스를 위한 API 입니다.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const PORT = process.env.PORT || 3000;

  console.log(`🚀 Server is running on http://localhost:${PORT}`);

  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
