import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express, { Request, Response } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

async function bootstrap() {
  // Optional: log all incoming requests
  server.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Enable CORS properly
  app.enableCors({
    origin: [
      'https://trustsuccessfinances.com',
      'https://www.trustsuccessfinances.com',
      'https://finance-dashboard-eta-six.vercel.app',
      'https://www.finance-dashboard-eta-six.vercel.app',
      'http://localhost:5173',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Handle OPTIONS preflight manually (optional but safer)
  server.options('*', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap();

export default server;
