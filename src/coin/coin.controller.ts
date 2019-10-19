import { Controller, Get, Header, Param} from '@nestjs/common';
import {CoinService} from './coin.service'
import {Coin} from './interfaces/coin.inteface'
import { thisTypeAnnotation } from '@babel/types';

@Controller('coin')
export class CoinController {
    constructor(private readonly coinService: CoinService) {}
    
    @Get(':id')
    @Header('asdasd', 'none')
    async getCoins(@Param() params){
        console.log(params.id);
        if (params.id ==='all'){
            return this.coinService.getAll()    
        }else return this.coinService.getCoins(params.id)
        //this.coinService.getCoins()
        //return `This action returns a #${params.id} cat`;
        
    }
    
    
}