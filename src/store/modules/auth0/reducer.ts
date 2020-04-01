import {
  AUTHENTICATE_PENDING,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  PASSWORD_RESET_PENDING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
} from './actions';

const initialState = {
  authenticated: null,
  authenticatePending: null,
  authenticateResponse: null,
  authenticateError: null,

  passwordResetPending: null,
  passwordResetResponse: null,
  passwordResetError: null,
};

export default function auth0(state = initialState, action: { type: any; payload: any; error: any }) {
  switch (action.type) {
    case AUTHENTICATE_PENDING:
      return {
        ...state,
        authenticated: null,
        authenticatePending: true,
        authenticateResponse: null,
        authenticateError: null,
      };

    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticatePending: false,
        authenticateResponse: action.payload,
      };

    case AUTHENTICATE_ERROR:
      return {
        ...state,
        authenticated: false,
        authenticatePending: false,
        authenticateError: action.error,
      };

    case PASSWORD_RESET_PENDING:
      return {
        ...state,
        passwordResetPending: true,
        passwordResetResponse: null,
        passwordResetError: null,
      };

    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetPending: false,
        passwordResetResponse: action.payload,
      };

    case PASSWORD_RESET_ERROR:
      return {
        ...state,
        passwordResetPending: false,
        passwordResetError: action.error,
      };

    default:
      return state;
  }
}
