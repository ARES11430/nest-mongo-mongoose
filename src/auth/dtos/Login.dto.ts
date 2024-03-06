import { IsNotEmpty, IsString } from "class-validator";


export class LogingDto {

    @IsString()
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}