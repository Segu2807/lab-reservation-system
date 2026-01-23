// gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayInterceptor } from './interceptors/gateway.interceptor';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayInterceptor],
})
export class AppModule {}