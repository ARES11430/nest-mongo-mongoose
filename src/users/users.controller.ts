import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards } from "@nestjs/common"
import mongoose from "mongoose"

import { UserService } from "./users.service"
import { CreateUserDto } from "./dtos/CreateUser.dto"
import { UpdateUserDto } from "./dtos/UpdateUser.dto"
import { IsAdmin } from "../middlewares/auth.middleware"


@Controller('users')
export class UserSController {

    constructor(private usersService: UserService) { }

    @Post('create-user')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto)
    }

    @Get('all')
    @UseGuards(IsAdmin)
    async getUsers() {
        return await this.usersService.getUsers()
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {

        const user = await this.usersService.getUserById(id)
        if (!user) throw new HttpException('user not found', 404)

        return user
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

        if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('user not found', 404)

        const user = await this.usersService.getUserById(id)
        if (!user) throw new HttpException('user not found', 404)

        return await this.usersService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {

        if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('user not found', 404)

        const user = await this.usersService.getUserById(id)
        if (!user) throw new HttpException('user not found', 404)

        await this.usersService.deleteUser(id)
        return { data: 'user deleted successfully' }
    }
}