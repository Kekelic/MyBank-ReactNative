import { Dispatch } from 'react';
import bankApi from '../api/bankApi';
import { BankAccount } from '../types/BankAccountTypes';
import createDataContext from './createDataContext';

type BankAccountState = {
  bankAccounts: BankAccount[];
  errorMessage: string;
};

type BankAccountAction = {
  type: string;
  payload: BankAccount | string | BankAccount[] | null;
};

export type BankAccountDataContext = {
  getBankAccounts: (basicAuth: string) => BankAccount[];
  clearBankAccounts: () => void;
  state: BankAccountState;
};

const bankAccountReducer = (
  state: BankAccountState,
  action: BankAccountAction,
) => {
  switch (action.type) {
    case 'save_bank_accounts': {
      return { errorMessage: '', bankAccounts: action.payload };
    }
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_bank_accounts':
      return { errorMessage: '', bankAccounts: [] };
    default:
      return state;
  }
};

const getBankAccounts =
  (dispatch: Dispatch<BankAccountAction>) => async (basicAuth: string) => {
    try {
      const response = await bankApi.get('/bank-accounts', {
        headers: {
          Authorization: basicAuth,
        },
      });
      dispatch({ type: 'save_bank_accounts', payload: response.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with getting user data',
      });
    }
  };

const clearBankAccounts = (dispatch: Dispatch<BankAccountAction>) => () => {
  dispatch({ type: 'clear_bank_accounts', payload: null });
};

export const { Provider, Context } = createDataContext(
  bankAccountReducer,
  { getBankAccounts, clearBankAccounts },
  { bankAccounts: [], errorMessage: '' },
);
