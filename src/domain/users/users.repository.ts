import { User } from './user';

export const UsersRepositoryToken = Symbol('UsersRepository');
export interface UsersRepository {
  //👤 사용자 조회
  getUserById(userId: number): Promise<User>;
}
