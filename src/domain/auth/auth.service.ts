import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthRepository, AuthRepositoryToken } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepositoryToken)
    private readonly authRepository: AuthRepository,
  ) {}

  async checkUserExists(userId: number): Promise<boolean> {
    const isValidUser = await this.authRepository.checkUserExists(userId);

    //TODO: 에러 처리
    if (!isValidUser)
      throw new BadRequestException('유효하지 않은 아이디 입니다.');

    return isValidUser;
  }
}
