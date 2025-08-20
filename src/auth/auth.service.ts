import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private admin = {
    username: 'admin',
    password: 'admin123', // plain text for testing
  };

  async validateAdmin(dto: { username: string; password: string }) {
    console.log('DTO received at backend:', dto);

    if (
      dto.username !== this.admin.username ||
      dto.password !== this.admin.password
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this.jwtService.sign({
        username: this.admin.username,
        role: 'admin',
      }),
    };
  }
}
