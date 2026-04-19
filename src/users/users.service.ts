import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name: username } });
  }

  hashPassword(password: string): string {
    const saltOrRounds = this.configService.getOrThrow<string>('BCRYPT_SALT');
    return hashSync(password, parseInt(saltOrRounds, 10));
  }

  validatePassword(password: string, hash: string): boolean {
    const isMatch = compareSync(password, hash);
    return isMatch;
  }
}
