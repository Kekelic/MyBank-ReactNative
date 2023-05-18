import { User } from './UserTypes';

export type BankAccount = {
  id: number;
  balance: number;
  allowedMinus: number;
  limitWithdraw: number;
  user: User;
};
