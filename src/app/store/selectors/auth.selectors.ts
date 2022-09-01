import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth?.user
);
