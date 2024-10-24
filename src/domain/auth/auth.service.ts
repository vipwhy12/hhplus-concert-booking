import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository, AuthRepositoryToken } from './auth.repository';
import { InvalidUserException } from 'src/common/exception/invalid.user.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepositoryToken)
    private readonly authRepository: AuthRepository,
  ) {}

  async checkUserExists(userId: number): Promise<boolean> {
    const isValidUser = await this.authRepository.checkUserExists(userId);

    if (!isValidUser) {
      throw new InvalidUserException();
    }

    return isValidUser;
  }
}
