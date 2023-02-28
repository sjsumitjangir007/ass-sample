import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const conf = configuration();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.enableVersioning();
  // app.setGlobalPrefix('api/');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(conf.port);
}
bootstrap();
