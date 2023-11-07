// import { RedisClientOptions } from 'redis';
// import { ConfigService } from '@nestjs/config';

// export const redisConfig = (): RedisClientOptions => {
//   const config = new ConfigService();

//   console.log("config.get('REDIS_HOST') ", config.get('REDIS_HOST'))
//   console.log("config.get('REDIS_PORT') ", config.get('REDIS_PORT'))
//   console.log("config.get('store') ", config.get<string>('store'))
//   console.log("config.get('REDIS_HOST') ", config.get('REDIS_HOST'))
//   return {
//     store: config.get<string>('store'),
//     isGlobal: true,
//     host: config.get('REDIS_HOST'),
//     port: config.get('REDIS_PORT'),
//   };
// };

import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';

@Injectable()
export class RedisConfigService implements CacheOptionsFactory{
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    console.log('redis config')
    return {
      store: this.configService.get('store'),
      isGlobal: true,
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    };
  }
}