import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constants/constants';
import { Point } from './common/entities/point.entity';
import { PointsModule } from './modules/points/points.module';
import { UserEntity } from './common/entities/user.entity';

//TODO: import 외부로 빼기
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: 'ConcertBooking',
        synchronize: true,
        logging: true,
        entities: [Point, UserEntity],
      }),
    }),
    PointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
