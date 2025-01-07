import {Point} from './point.interface';

export interface Response {
  status: number;
  token?: string;
  message?: string;
  data?: Point[];
  isHit?: boolean;
}
