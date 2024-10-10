import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { QueuesModule } from './queues/queues.module';
import { ConcertsModule } from './concerts/concerts.module';
import { PointsModule } from './points/points.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // load: [async () => console.log('test')],
    }),
    QueuesModule,
    ConcertsModule,
    PointsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
