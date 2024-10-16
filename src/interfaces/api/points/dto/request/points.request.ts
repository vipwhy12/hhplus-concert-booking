import { Request } from 'express';

export interface PointRequestDto extends Request {
  user: {
    id: number;
  };
}
