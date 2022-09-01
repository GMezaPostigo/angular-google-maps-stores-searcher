import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthActions } from '../../actions.types';

export interface AuthState {
  user: IUser;
}

let user: IUser = undefined!;
if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user')!);
}
export const initialAuthState: AuthState = {
  user: user
};
export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  }),

  on(AuthActions.logout, (state) => {
    return {
      user: undefined!
    };
  })
);
