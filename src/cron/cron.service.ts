import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import {CoinService} from '../coin/coin.service'

@Injectable() // Only support SINGLETON scope
export class ScheduleService extends NestSchedule {    
  @Cron('0 0 2 * *', {
    startTime: new Date(), 
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async cronJob() {
    console.log('executing cron job');
  }
  
  @Timeout(5000)
  onceJob() {
    
  }
  
  @Interval(10000)
  intervalJob() {
    require('dotenv').config()
    let coinService = new CoinService
    coinService.getCoins(process.env.query_values)
    console.log('nice work, watch dbw');
    
    // if you want to cancel the job, you should return true;
    
  }
}