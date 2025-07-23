import { Injectable } from '@nestjs/common';
import { Bot, CommandContext, Context } from 'grammy';
import { CreateCustomerDto, CustomerService } from '../customer';
import { CustomerSessionData } from 'src/core';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TelegramService {
  private bot: Bot;
  private customerSession: Partial<CustomerSessionData>[] = [];

  constructor(
    // @InjectModel(Customer.name)
    // private readonly customerModel: Model<CustomerDocument>,
    private readonly customerService: CustomerService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async initBot() {
    const token = this.configService.get<string>('telegram.bot.token');

    this.bot = new Bot(token);

    this.bot.command('start', async (ctx: CommandContext<Context>) => {
      await this.sleep(200);

      await ctx.react('😇');

      await this.sleep(300);

      await ctx.reply(`Assalomu alaykum 😊`);

      const chat_id: number = ctx.message.chat.id;

      const [customer] = await this.customerService.getAll({ chat_id });

      if (!customer) {
        await this.sleep(500);
        await ctx.reply(
          `Ro'yxatdan o'tish uchun 2 ta bosqich mavjud!\n\n☎️ 1-Telefon raqam yuboring.\n👤 2-Ism Familiyangizni yuboring.\n\n 🔗 Keyin sizga magazinimiz uchun havola taqdim etiladi. 😊`,
          {
            reply_markup: {
              keyboard: [
                [
                  {
                    text: '📞 Telefon raqamni yuborish',
                    request_contact: true,
                  },
                ],
              ],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        );

        this.customerSession.push({
          chat_id,
        });
      } else {
        const token = await this.jwtService.signAsync(customer.toObject());
        ctx.reply(`URL: https://myapp.vercel.app/frontend?token=${token}`);
      }
    });

    this.bot.on('message:contact', async (ctx) => {
      const chat_id = ctx.message.chat.id;

      const foundedCustomer = this.customerSession.find(
        (customer) => customer.chat_id === chat_id,
      );

      foundedCustomer.phone_number = ctx.message.contact.phone_number;

      await ctx.reply(`Ajoyib! 😅`);

      await this.sleep(200);

      await ctx.reply(`Endilikda Ism familiyangizni yuboring 😅`);
    });

    this.bot.on('message:text', async (ctx) => {
      const chat_id = ctx.message.chat.id;

      const foundedCustomer = this.customerSession.find(
        (customer) => customer.chat_id === chat_id,
      );

      if (!foundedCustomer) return;

      foundedCustomer.fullname = ctx.message.text;

      let [customer] = await this.customerService.getAll({ chat_id });

      console.log(customer);

      const dto = plainToInstance(CreateCustomerDto, foundedCustomer);

      if (!customer) {
        // foydalanuchi yaratildi
        customer = await this.customerService.create(dto);
      }

      const token = await this.jwtService.signAsync(customer.toObject());

      ctx.reply(
        `<a href='https://myapp.vercel.app/frontend?token=${token}'>Shu link ustiga bosing.</a>`,
        { parse_mode: 'HTML' },
      );
    });

    await this.bot.init();
  }

  getBot() {
    return this.bot;
  }
}
