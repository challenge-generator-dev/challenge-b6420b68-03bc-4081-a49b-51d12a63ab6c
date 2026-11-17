import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './infrastructure/config/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();