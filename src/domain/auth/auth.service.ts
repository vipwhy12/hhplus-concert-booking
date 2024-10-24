import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository, AuthRepositoryToken } from './auth.repository';
import { InvalidUserException } from 'src/common/exception/invalid.user.exception';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepositoryToken)
    private readonly authRepository: AuthRepository,
  ) {}

  async checkUserExists(
    userId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const isValidUser = manager
      ? await this.authRepository.checkUserExists(userId, manager)
      : await this.authRepository.checkUserExists(userId);

    if (!isValidUser) {
      throw new InvalidUserException();
    }

    return isValidUser;
  }
}
