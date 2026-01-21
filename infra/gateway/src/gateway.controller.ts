// gateway/src/gateway.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Req, Res, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { GatewayInterceptor } from './interceptors/gateway.interceptor';
import { firstValueFrom } from 'rxjs';

const SERVICES = {
  users: 'http://user-service:3001',
  labs: 'http://lab-service:3002',
  reservations: 'http://reservation-service:3003',
  availability: 'http://availability-service:3004',
  approvals: 'http://approval-service:3005',
  audit: 'http://audit-service:3006',
  notifications: 'http://notification-service:3007',
  reports: 'http://report-service:3008',
};

@Controller()
@UseInterceptors(GatewayInterceptor)
export class GatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/health')
  async healthCheck() {
    return { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      services: Object.keys(SERVICES)
    };
  }

  // Users Service
  @Post('/users')
  async createUser(@Body() body: any, @Req() req: Request) {
    return this.proxyRequest('users', req);
  }

  @Get('/users')
  async getUsers(@Req() req: Request) {
    return this.proxyRequest('users', req);
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: string, @Req() req: Request) {
    return this.proxyRequest('users', req);
  }

  // Labs Service
  @Post('/labs')
  async createLab(@Body() body: any, @Req() req: Request) {
    return this.proxyRequest('labs', req);
  }

  @Get('/labs')
  async getLabs(@Req() req: Request) {
    return this.proxyRequest('labs', req);
  }

  // Reservations Service
  @Post('/reservations')
  async createReservation(@Body() body: any, @Req() req: Request) {
    return this.proxyRequest('reservations', req);
  }

  @Get('/reservations')
  async getReservations(@Req() req: Request) {
    return this.proxyRequest('reservations', req);
  }

  // Helper method for proxying requests
  private async proxyRequest(service: keyof typeof SERVICES, req: Request) {
    const targetUrl = `${SERVICES[service]}${req.originalUrl}`;
    
    try {
      const method = req.method.toLowerCase();
      const config = {
        headers: req.headers,
        params: req.query,
      };

      let response;
      switch (method) {
        case 'get':
          response = await firstValueFrom(this.httpService.get(targetUrl, config));
          break;
        case 'post':
          response = await firstValueFrom(this.httpService.post(targetUrl, req.body, config));
          break;
        case 'put':
          response = await firstValueFrom(this.httpService.put(targetUrl, req.body, config));
          break;
        case 'delete':
          response = await firstValueFrom(this.httpService.delete(targetUrl, config));
          break;
        default:
          throw new Error(`Method ${method} not supported`);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}