import { AuthRepository } from 'src/domain/auth/auth.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async checkUserExists(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });
    return !!user;
  }
}
