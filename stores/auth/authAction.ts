import { login, logout } from './authSlice';

export const loginAction = () => (dispatch: any) => {
  dispatch(login());
};

export const logoutAction = () => (dispatch: any) => {
  dispatch(logout());
};