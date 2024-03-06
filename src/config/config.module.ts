import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Make the config module global
        }),
    ],
    exports: [ConfigModule],
})
export class MyConfigModule { }
