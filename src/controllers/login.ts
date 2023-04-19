import { Controller, Post, Body, Res ,UnauthorizedException} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


@Post('/login')
async LoginDto(@Body() authDto: AuthDto, @Res() res: Response){
    const { username, password } = authDto; // extrai o username e password do objeto AuthDto
    const result = await this.authService.validateUser(username, password); // passa apenas os dois argumentos para validateUser
    if (result.success) {
        res.cookie('access_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
        });

        return res.redirect('/feed');

    }
    else {
        throw new UnauthorizedException();
    }
 }
}
