import { Injectable } from '@nestjs/common';
import {Coin} from './interfaces/coin.inteface'
import { create } from 'domain';
import { reject, async } from 'q';
import { resolve } from 'dns';
import { CoinController } from './coin.controller';
import { AdvancedConsoleLogger } from 'typeorm';

@Injectable()
export class CoinService{
    private readonly coins: Coin[] = []
    private readonly all: Coin[] = []
    async getCoins(id:string): Promise<Coin[]>{
        var rp = require('request-promise');
        console.log(id)
        let params = [1,2]
        var options = {
            url: `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${params}`,
            headers: {
            'X-CMC_PRO_API_KEY': 'e66f7f7e-f2e9-40b4-9959-e98a669ded5c'
            },
            json: true
        };
        
        let data = await rp(options)
            .then(function (body) {
                return body
            })
            .catch(function (err) {
            });   
        //console.log(typeof data)
        let dt=[]
        let js=''
        for (let key in data.data){
            dt.push(data.data[key])
        }
        
        dt.forEach(element => {
        //console.log(element)
        //console.log(typeof element)
        js = js +`('${JSON.stringify(element)}'),`
        this.coins.push(element)    
        });
        js = js.slice(0, -1);
        //console.log(js)

        // const { Pool, Client } = require('pg')
        // const pool = new Pool({
        //     host: 'localhost',
        //     port: 5432,
        //     user: 'postgres',
        //     password: '19970708',
        //     database: 'coins',
            
        //   })
        // pool.query(`insert into public.coins (data) values ${js}`, (err, res) => {
        //   //console.log(err, res)
        //   pool.end()
        // })
    return this.coins
    }

    async getAll(): Promise<Coin[]>{
        console.log('alo')
        const { Pool, Client } = require('pg')
        const pool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: '19970708',
            database: 'coins',    
        })
        let client = await pool.connect()   
        let result = await client.query(`select data from public.coins`).then(res => {
            //console.log(res.rows)
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
            pool.end()
            return res.rows
          })
          .catch(e => console.error(e.stack))  
          
        console.log(result)
        result.forEach(element => {
            //console.log(element)
            //console.log(typeof element)
            this.all.push(element.data) 
            });
    return  this.all
    }

    
}