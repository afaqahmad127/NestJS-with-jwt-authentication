import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigrationModule } from './configration/configration.module';
import { ConfigrationService } from './configration/configration.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigrationModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigrationModule],
      useFactory: async (configService: ConfigrationService) =>
        configService.mongooseConfig,
      inject: [ConfigrationService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
