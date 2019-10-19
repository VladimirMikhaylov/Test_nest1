import { Injectable } from '@nestjs/common';
import {CoinService} from '../coin/coin.service';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { CoinController } from 'src/coin/coin.controller';


@Injectable() // Only support SINGLETON scope
export class ScheduleService extends NestSchedule {  
 
  @Cron('0 0 2 * * *', {
    startTime: new Date(), 
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async cronJob() {
    console.log('executing cron job');
  }
  
  @Timeout(5000)
  onceJob() {
    console.log('executing once job');
  }
  
  @Interval(2000)
  intervalJob() {
    console.log('executing interval job');
            //console.log(coinService.getAll()) 
            //return this.coinService.getCoins(params.id)
    // if you want to cancel the job, you should return true;
    //return true;
  }
}