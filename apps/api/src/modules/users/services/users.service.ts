import { Injectable } from '@nestjs/common';

import { User } from '../schemas/user.schema';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  create(user: Partial<User>) {
    return this.usersRepository.create(user);
  }

  findByPhone(phone: string) {
    return this.usersRepository.findByPhone(phone);
  }

  existsByPhone(phone: string) {
    return this.usersRepository.existsByPhone(phone);
  }

  findById(id: string) {
    return this.usersRepository.findById(id);
  }
}