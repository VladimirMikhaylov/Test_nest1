import { Controller, Get, Header, Param} from '@nestjs/common';

@Controller('coin')
export class CoinController {
    @Get()
    @Header('asdasd', 'none')
    findAll(@Param() params): string{
        var request = require('request');
        params.id = 1
        var options = {
          url: `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${params.id}`,
          headers: {
            'X-CMC_PRO_API_KEY': 'e66f7f7e-f2e9-40b4-9959-e98a669ded5c'
          }
        };
 
        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.stargazers_count + " Stars");
            console.log(info.forks_count + " Forks");
            console.log(body + 'zalupa');
          }
        }
 
        request(options, callback);
        return 'Ok'
    }
}