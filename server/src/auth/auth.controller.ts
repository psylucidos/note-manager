import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import authRequestUserInterface from './authrequser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: authRequestUserInterface) {
    const user = await this.authService.findUserByEmail(body.email);
    if (!user || !(await this.authService.verifyPassword(user, body.password))) {
      return { message: 'Invalid email or password' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: authRequestUserInterface) {
    const existingUser = await this.authService.findUserByEmail(body.email);
    if (existingUser) {
      return { message: 'Email already exists' };
    }
    const newUser = await this.authService.createUser({
      name: body.name,
      email: body.email,
      password: body.password
    });
    return this.authService.login(newUser);
  }
}