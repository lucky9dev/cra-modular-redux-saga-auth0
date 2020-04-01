import { put, call, takeLatest } from 'redux-saga/effects';

import { AUTHENTICATE_PENDING, authenticateSuccess, authenticateError, PASSWORD_RESET_PENDING, passwordResetSuccess, passwordResetError } from './actions';

export function* parseHash(AuthService: any) {
  try {
    const response = yield call(AuthService.handleAuthentication);

    yield put(authenticateSuccess(response));
  } catch (err) {
    yield put(authenticateError(err));
  }
}

export function* passwordReset(ApiService: any) {
  try {
    const { path, method } = ApiService.directory.user.password.reset();
    const response = yield call(ApiService[method], path);

    yield put(passwordResetSuccess(response));
  } catch (err) {
    yield put(passwordResetError(err));
  }
}

// @ts-ignore
export default function* auth0({ AuthService, ApiService }) {
  yield takeLatest(AUTHENTICATE_PENDING, parseHash, AuthService);
  yield takeLatest(PASSWORD_RESET_PENDING, passwordReset, ApiService);
}
