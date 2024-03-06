import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "../schemas/User.schema";
import { UserSettings, userSettingsSchema } from "../schemas/UserSettings.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: userSchema },
    { name: UserSettings.name, schema: userSettingsSchema },
  ])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
