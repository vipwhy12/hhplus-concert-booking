import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersService } from './users.service';
import { UsersRepository, UsersRepositoryToken } from './users.repository';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: DeepMocked<UsersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepositoryToken,
          useFactory: () => createMock<UsersRepository>(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(UsersRepositoryToken);
  });

  describe('서비스가 정의되어있으면', () => {
    it('성공한다.', () => {
      expect(usersService).toBeDefined();
    });
  });

  describe('유저 유효성 검사 시,', () => {
    describe('유저가 유효하면', () => {
      const validUserId = 1;
      const validUser = { id: 1, name: 'John Doe' };

      it('성공한다.', async () => {
        usersRepository.getUserById.mockResolvedValue(validUser);

        const result = usersService.isValidUser(validUserId);

        await expect(result).resolves.toBe(validUser);
      });
    });

    describe('유저가 유효하지 않으면', () => {
      const invalidUserId = 99;

      it('실패한다.', async () => {
        usersRepository.getUserById.mockResolvedValue(null);

        const result = usersService.isValidUser(invalidUserId);

        await expect(result).rejects.toThrow(BadRequestException);
        await expect(result).rejects.toThrow('유효하지 않은 아이디 입니다.');
      });
    });
  });
});
