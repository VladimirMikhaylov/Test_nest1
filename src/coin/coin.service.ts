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
        console.log('sssss')
        require('dotenv').config()
        var rp = require('request-promise');
        //console.log(process.env)
        
        var options = {
            url: `${process.env.coin_url}=${id}`,
            headers: {
            'X-CMC_PRO_API_KEY': process.env.coin_key
            },
            json: true
        };
        
        let data = await rp(options)
            .then(function (body) {
                return body
            })
            .catch(function (err) {
            });   
        let dt=[]
        let js=''
        for (let key in data.data){
            dt.push(data.data[key])
        }
        
        dt.forEach(element => {
            js = js +`('${JSON.stringify(element)}'),`
            this.coins.push(element)    
        });
        js = js.slice(0, -1);

        const { Pool, Client } = require('pg')
        const pool = new Pool({
            host: process.env.db_host,
            port: process.env.db_port,
            user: process.env.db_user,
            password: process.env.db_password,
            database: process.env.db_database,    
        })
        pool.query(`insert into public.coins (data) values ${js}`, (err, res) => {
            //console.log(err,res)
            pool.end()
        })
    return this.coins
    }

    async getAll(): Promise<Coin[]>{
        //require('dotenv').config()
        
        const { Pool, Client } = require('pg')
        const pool = new Pool({
            host: process.env.db_host,
            port: process.env.db_port,
            user: process.env.db_user,
            password: process.env.db_password,
            database: process.env.db_database,    
        })
        let client = await pool.connect()   
        let result = await client.query(`select data from public.coins`)
            .then(res => {
                pool.end()
                return res.rows
            })
            .catch(e => console.error(e.stack))  
          
        result.forEach(element => {

            this.all.push(element.data) 
        });
    return  this.all
    }

    
}