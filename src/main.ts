import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  // Enable CORS
  app.enableCors({
    origin: [
      'https://trustsuccessfinances.com',
      'https://www.trustsuccessfinances.com',
      'http://localhost:5173',
    ],

    // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to allow cookies
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

export default server;
