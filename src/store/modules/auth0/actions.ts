import { createAction, createErrorAction } from '../../helpers';

export const AUTHENTICATE_PENDING = 'AUTHENTICATE_PENDING';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR';

export const PASSWORD_RESET_PENDING = 'PASSWORD_RESET_PENDING';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';

export function authenticate() {
  return createAction(AUTHENTICATE_PENDING);
}

export function authenticateSuccess(payload: any) {
  return createAction(AUTHENTICATE_SUCCESS, payload);
}

export function authenticateError(error: any) {
  return createErrorAction(AUTHENTICATE_ERROR, error);
}

export function passwordReset() {
  return createAction(PASSWORD_RESET_PENDING);
}

export function passwordResetSuccess(payload: any) {
  return createAction(PASSWORD_RESET_SUCCESS, payload);
}

export function passwordResetError(error: any) {
  return createErrorAction(PASSWORD_RESET_ERROR, error);
}
