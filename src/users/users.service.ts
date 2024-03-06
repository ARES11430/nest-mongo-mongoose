import { HttpException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import * as bcrypt from 'bcrypt'

import { User } from "../schemas/User.schema"
import { UserSettings } from "../schemas/UserSettings.schema"

import { CreateUserDto } from "./dtos/CreateUser.dto"
import { UpdateUserDto } from "./dtos/UpdateUser.dto"
import { LogService } from "../log/log.service"


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
        private logService: LogService
    ) { }

    async createUser({ settings, ...createUserDto }: CreateUserDto) {

        const { username } = createUserDto

        let user = await this.userModel.findOne({ username })
        if (user) throw new HttpException('username is already taken', 400)

        if (settings) {
            try {
                const userSettings = new this.userSettingsModel(settings)
                const savedSettings = await userSettings.save()

                user = new this.userModel({ ...createUserDto, settings: savedSettings._id })

                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)

                await user.save()
                return { token: user.generateAuthToken() }
            } catch (error) {
                this.logService.logger.error(error)
                throw new HttpException('something failed in server', 500)
            }
        }

        try {
            user = new this.userModel(createUserDto)

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)

            await user.save()
            return { token: user.generateAuthToken() }
        } catch (error) {
            this.logService.logger.error(error)
            throw new HttpException('something failed in server', 500)
        }
    }

    async getUsers() {
        return await this.userModel.find().select('_id username settings posts')
            .populate('settings', '_id receiveNotification receiveEmail receiveSMS')
            .populate('posts', '_id title')
    }

    async getUserById(id: string) {
        return await this.userModel.findById(id).populate(['settings', 'posts']);
    }

    async getUserByUsername(username: string) {
        return await this.userModel.findOne({ username })
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    }

    async deleteUser(id: string) {
        return await this.userModel.findByIdAndDelete(id)
    }
}