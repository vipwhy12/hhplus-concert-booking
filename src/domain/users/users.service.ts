import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository, UsersRepositoryToken } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryToken)
    private readonly usersRepository: UsersRepository,
  ) {}

  //이미 존재하는 유저인지 확인했는데 굳이 메서드 명이 이래야 할 필요가  있니?
  async isValidUser(userId: number) {
    const isValidUser = await this.usersRepository.getUserById(userId);

    if (!isValidUser)
      throw new BadRequestException('유효하지 않은 아이디 입니다.');

    return isValidUser;
  }
}
