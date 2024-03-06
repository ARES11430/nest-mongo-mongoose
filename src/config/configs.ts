import { ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();

const configService = new ConfigService()

export const JWT_PRIVATE_KEY: string = configService.get<string>('JWT_PRIVATE_KEY')

export const MONGO_URI: string = configService.get<string>('MONGO_URI')

export const MONGO_URI_TEST: string = configService.get<string>('MONGO_URI_TEST')

export const MONGO_URI_FALLBACK: string = configService.get<string>('MONGO_URI_FALLBACK')

export const ENV: string = configService.get<string>('ENV')


