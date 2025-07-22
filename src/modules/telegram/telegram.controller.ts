import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  async handleUpdate(@Req() req: Request) {
    const bot = this.telegramService.getBot();
    await bot.handleUpdate(req.body);
    return 'ok';
  }
}
