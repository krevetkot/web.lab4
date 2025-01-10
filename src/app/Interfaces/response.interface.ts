import {Point} from './point.interface';

export interface Response {
  status: number;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  data?: Point[];
  isHit?: boolean;
}
