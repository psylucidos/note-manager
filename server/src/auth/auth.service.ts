import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import authRequestUserInterface from './authrequser.interface';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(user: authRequestUserInterface): Promise<User> {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await argon2.hash(user.password + salt);
    return this.userRepository.save({ name: user.name, email: user.email, password: hashedPassword, salt: salt });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  
  async verifyPassword(user: User, password: string): Promise<boolean> {
    return argon2.verify(user.password, password + user.salt);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}