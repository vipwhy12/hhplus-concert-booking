import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository, UsersRepositoryToken } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryToken)
    private readonly usersRepository: UsersRepository,
  ) {}

  async isValidUser(userId: number) {
    const isValidUser = await this.usersRepository.getUserById(userId);

    if (!isValidUser)
      throw new BadRequestException('유효하지 않은 아이디 입니다.');

    return isValidUser;
  }
}
