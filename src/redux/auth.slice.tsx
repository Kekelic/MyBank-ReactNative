import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoggedInPayload = {
  loggedIn: boolean;
};

type BasicAuthorizationPayload = {
  username: string;
  password: string;
};

type AuthorizationState = {
  loggedIn: boolean;
  basicAuth: string;
};

const initialState: AuthorizationState = {
  loggedIn: false,
  basicAuth: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<LoggedInPayload>) => ({
      ...state,
      loggedIn: action.payload.loggedIn,
    }),
    setBasicAuthorization: (
      state,
      action: PayloadAction<BasicAuthorizationPayload>,
    ) => ({
      ...state,
      basicAuth:
        'Basic ' +
        require('base-64').encode(
          action.payload.username + ':' + action.payload.password,
        ),
    }),
    clearData: (state, action: PayloadAction) => ({
      loggedIn: false,
      basicAuth: '',
    }),
  },
});

export const { setLoggedIn, setBasicAuthorization, clearData } =
  authSlice.actions;

export default authSlice.reducer;
