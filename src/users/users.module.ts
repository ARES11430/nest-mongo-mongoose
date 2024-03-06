import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "../schemas/User.schema";
import { UserService } from "./users.service";
import { UserSController } from "./users.controller";
import { UserSettings, userSettingsSchema } from "../schemas/UserSettings.schema";
import { LogService } from "../log/log.service";

@Module({
    imports: [MongooseModule.forFeature([
        { name: User.name, schema: userSchema },
        { name: UserSettings.name, schema: userSettingsSchema },
    ])],
    providers: [UserService],
    controllers: [UserSController]
})
export class UserModule { }