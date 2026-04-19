import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('notifications')
export class NotificationsController {
  @Post()
  async notify(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers: any
  ) {
    console.log('🔔 Webhook recebido!');

    console.log('📦 Headers:');
    console.log(headers);

    console.log('📦 Query Params:');
    console.log(req.params);

    console.log('📦 Body:');
    console.log(req.body);

    // Sempre responda rápido (evita retry do Mercado Pago)
    return res.status(200).send('OK');
  }
}
