import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Usuario } from 'src/dto/usuario.entity';
import { UsuariosService } from 'src/service/usuarios.service';



@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService : UsuariosService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser (usuario: string, senha: string): Promise <Usuario> {
        const user = await this.usuariosService.findByUsername(usuario);

        if(!user) {
            return null;
        }

        const passwordMatch = await compare(senha, user.senha);

        if (passwordMatch) {
            return user;
        }

        return null;
    }

    async generateToken(user: Usuario): Promise<string> {
        const payload = {sub: user.id, username: user.usuario};
        return this.jwtService.signAsync(payload);
    }
}