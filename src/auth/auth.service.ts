import { HttpException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import * as bcrypt from 'bcrypt'

import { User } from "../schemas/User.schema"

import { LogingDto } from "./dtos/Login.dto"

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async login(loginDto: LogingDto) {

        const { username, password } = loginDto

        const user = await this.userModel.findOne({ username })
        if (!user) throw new HttpException('username or password is wrong', 404)

        const result = await bcrypt.compare(password, user.password)

        if (!result) throw new HttpException('username or password is wrong', 404)

        const token = user.generateAuthToken()

        return { token }
    }
}
