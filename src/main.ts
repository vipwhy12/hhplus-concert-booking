import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { apiDocument } from './common/docs/api.document';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { HttpExceptionFilter } from './common/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const apiDocumentConfig = new apiDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, apiDocumentConfig);
  const logger = WinstonModule.createLogger({
    transports: new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('hhplus-concert-booking', {
          prettyPrint: true,
          colors: true,
          appName: true,
        }),
      ),
    }),
  });

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(logger);

  logger.log(`🚀 Server is running on http://localhost:${PORT}`);

  await app.listen(PORT);
}

bootstrap();
