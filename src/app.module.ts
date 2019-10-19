import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinController } from './coin/coin.controller';
import {CoinService} from './coin/coin.service'
import { ScheduleModule } from 'nest-schedule';
import {ScheduleService} from './cron/cron.service'


@Module({
  imports: [
    ScheduleModule.register(),
  ],
  controllers: [AppController, CoinController],
  providers: [AppService,CoinService,ScheduleService],
})
export class AppModule {}
