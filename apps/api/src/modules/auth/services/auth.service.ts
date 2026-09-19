import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../../users/services/users.service';

import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<AuthResponseDto> {
    const phone = dto.phone.trim();

    if (
      await this.usersService.existsByPhone(
        phone,
      )
    ) {
      throw new ConflictException(
        'Phone number already exists',
      );
    }

    const hashedPassword =
      await this.passwordService.hash(
        dto.password,
      );

    const user =
      await this.usersService.create({
        phone,
        password: hashedPassword,
      });

    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };

    return {
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
      accessToken:
        this.tokenService.generateAccessToken(
          payload,
        ),
      refreshToken:
        this.tokenService.generateRefreshToken(
          payload,
        ),
    };
  }

  async login(
    dto: LoginDto,
  ): Promise<AuthResponseDto> {
    const phone = dto.phone.trim();

    const user =
      await this.usersService.findByPhone(
        phone,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid phone number or password',
      );
    }

    const passwordMatches =
      await this.passwordService.compare(
        dto.password,
        user.password,
      );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid phone number or password',
      );
    }

    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };

    return {
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
      accessToken:
        this.tokenService.generateAccessToken(
          payload,
        ),
      refreshToken:
        this.tokenService.generateRefreshToken(
          payload,
        ),
    };
  }

  async me(id: string) {
    const user =
      await this.usersService.findById(id);

    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }

    return {
      id: user.id,
      phone: user.phone,
      role: user.role,
    };
  }
}