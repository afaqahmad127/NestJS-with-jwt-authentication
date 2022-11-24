import { MongodbConfigService } from './mongo.config';
import { Module } from '@nestjs/common';
import { ConfigrationService } from './configration.service';

@Module({
  providers: [ConfigrationService, MongodbConfigService],
  exports: [ConfigrationService, MongodbConfigService],
})
export class ConfigrationModule {}
