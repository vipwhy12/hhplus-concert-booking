import { EntityManager } from 'typeorm';

export const AuthRepositoryToken = Symbol('AuthRepository');
export interface AuthRepository {
  checkUserExists(userId: number, manager?: EntityManager): Promise<boolean>;
}
