import { BankAccount } from './BankAccountTypes';

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
  PrivacyPolicy: undefined;
  TermOfUse: undefined;
};

export type MainTabParams = {
  BankAccountHome: undefined;
  Account: undefined;
};

export type BankAccountStackParams = {
  BankAccountList: undefined;
  CreateBankAccount: undefined;
  DetailsBankAccount: { bankAccount: BankAccount };
};
