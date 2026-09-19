import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  phone: string;
  role: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(
    payload: JwtPayload,
  ): string {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(
    payload: JwtPayload,
  ): string {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  }
}