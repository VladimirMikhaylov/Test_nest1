import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinController } from './coin/coin.controller';

@Module({
  imports: [],
  controllers: [AppController, CoinController],
  providers: [AppService],
})
export class AppModule {}
