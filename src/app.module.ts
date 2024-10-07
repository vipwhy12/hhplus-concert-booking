import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // load: [async () => console.log('test')],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
