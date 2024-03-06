import { Type } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator"

export class CreateUserSettingsDto {

    @IsBoolean()
    @IsOptional()
    receiveNotification?: boolean

    @IsBoolean()
    @IsOptional()
    receiveEmail?: boolean

    @IsBoolean()
    @IsOptional()
    receiveSMS?: boolean
}

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string

    @IsString()
    @IsOptional()
    displayName?: string

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto
}