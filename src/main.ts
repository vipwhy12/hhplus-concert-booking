import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('콘서트 예약 서비스')
    .setDescription('콘서트 예약 서비스를 위한 API 입니다.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  console.log(`🚀 Server is running on http://localhost:${PORT}`);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

bootstrap();
