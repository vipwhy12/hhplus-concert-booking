import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly BEARER_PREFIX = 'Bearer ';

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request.headers.authorization);
    const decoded = await this.verifyToken(token);

    request.userId = decoded.user.id;

    return true;
  }

  getTokenFromHeader(authHeader: string): string {
    if (!authHeader)
      throw new UnauthorizedException('Authorization header is missing');

    if (!authHeader.startsWith(this.BEARER_PREFIX))
      throw new UnauthorizedException('Invalid Authorization header format');

    return authHeader.slice(this.BEARER_PREFIX.length);
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, jwtConstants);
  }
}
