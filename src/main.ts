import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { apiDocument } from './common/docs/api.document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const apiDocumentConfig = new apiDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, apiDocumentConfig);

  console.log(`🚀 Server is running on http://localhost:${PORT}`);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

bootstrap();
