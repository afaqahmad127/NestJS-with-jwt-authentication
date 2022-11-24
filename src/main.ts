import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigrationModule } from './configration/configration.module';
import { ConfigrationService } from './configration/configration.service';
import { middleware as expressCtx } from 'express-ctx';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  const configService = app.select(ConfigrationModule).get(ConfigrationService);

  app.useGlobalPipes(new ValidationPipe({}));

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }
  app.use(expressCtx);
  await app.listen(configService.appConfig.port);
  console.info(`Server running on ${await app.getUrl()}`);
}
bootstrap();
