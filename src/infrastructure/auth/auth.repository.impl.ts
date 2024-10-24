import { AuthRepository } from 'src/domain/auth/auth.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async checkUserExists(id: number, manager?: EntityManager): Promise<boolean> {
    const user = manager
      ? await manager.findOne(UserEntity, { where: { id } })
      : await this.userRepository.findOne({ where: { id } });

    return !!user;
  }
}
