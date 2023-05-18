import { Dispatch } from 'react';
import bankApi from '../api/bankApi';
import { User } from '../types/UserTypes';
import createDataContext from './createDataContext';

type UserState = {
  errorMessage: string;
  user: User;
};

type UserAction = {
  type: string;
  payload: User | string | null;
};

export type UserDataContext = {
  getUser: (basicAuth: string) => User;
  clearUserData: () => void;
  state: UserState;
};

const authReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'getUser': {
      return { errorMessage: '', user: action.payload };
    }
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_user_data':
      return { errorMessage: '', user: null };
    default:
      return state;
  }
};

const getUser =
  (dispatch: Dispatch<UserAction>) => async (basicAuth: string) => {
    try {
      const response = await bankApi.get('/user', {
        headers: {
          Authorization: basicAuth,
        },
      });
      dispatch({ type: 'getUser', payload: response.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with getting user data',
      });
    }
  };

const clearUserData = (dispatch: Dispatch<UserAction>) => () => {
  dispatch({ type: 'clear_user_data', payload: null });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { getUser, clearUserData },
  { user: null, errorMessage: '' },
);
