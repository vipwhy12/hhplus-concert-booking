export const AuthRepositoryToken = Symbol('AuthRepository');
export interface AuthRepository {
  checkUserExists(userId: number): Promise<boolean>;
}
