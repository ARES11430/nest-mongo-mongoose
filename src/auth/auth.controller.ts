import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogingDto } from './dtos/Login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LogingDto) {
        return await this.authService.login(loginDto)
    }
}
