import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import { AuthRepository, AuthRepositoryToken } from '../auth.repository';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: DeepMocked<AuthRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepositoryToken,
          useFactory: () => createMock<AuthRepository>(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get(AuthRepositoryToken);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('서비스가 정의되어있으면', () => {
    it('성공한다.', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('유저 유효성 검사 시,', () => {
    describe('유저가 유효하면', () => {
      const validUserId = 1;
      const validUserResponse = true;

      it('성공한다.', async () => {
        authRepository.checkUserExists.mockResolvedValue(validUserResponse);

        const result = authService.checkUserExists(validUserId);

        await expect(result).resolves.toBe(validUserResponse);
      });
    });

    describe('유저가 유효하지 않으면', () => {
      const invalidUserId = 99;

      it('실패한다.', async () => {
        authRepository.checkUserExists.mockResolvedValue(false);

        const result = authService.checkUserExists(invalidUserId);

        await expect(result).rejects.toThrow(BadRequestException);
        await expect(result).rejects.toThrow('유효하지 않은 아이디 입니다.');
      });
    });
  });
});
