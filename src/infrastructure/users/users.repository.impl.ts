import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/user.entity';
import { User } from 'src/domain/users/user';
import { UsersRepository } from 'src/domain/users/users.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return new User(user.id, user.name);
  }
}
