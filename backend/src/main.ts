import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useWebSocketAdapter(new CustomIoAdapter(app));
  await app.listen(3000);
}

import { ServerOptions } from 'socket.io';

export class CustomIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);

    const cors = {
      origin: ['http://localhost:3001'],
      methods: ['GET', 'POST'],
      credentials: true,
    };

    server.corsOptions = cors;
    return server;
  }
}
bootstrap();
