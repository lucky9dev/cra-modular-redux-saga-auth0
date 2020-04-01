import auth0 from 'auth0-js';
import EventEmitter from 'events';

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';
const homepage = process.env.PUBLIC_URL;

const webAuth = new auth0.WebAuth({
  // @ts-ignore
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
  // @ts-ignore
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: `${window.location.protocol}//${window.location.host}${homepage}/callback`,
  responseType: 'token id_token',
  scope: 'openid profile email',
});

class AuthService extends EventEmitter {
  idToken = null;
  idTokenPayload = null;
  accessToken = null;
  accessTokenExpiry = null;

  signIn = (customState?: any) => {
    webAuth.authorize({
      appState: customState,
    });
  };

  signUp = (customState?: any) => {
    webAuth.authorize({
      appState: customState,
      mode: 'signUp',
    });
  };

  localLogin = (authResult: any) => {
    // @ts-ignore
    this.idToken = authResult.idToken;
    // @ts-ignore
    this.idTokenPayload = authResult.idTokenPayload;
    // @ts-ignore
    this.accessToken = authResult.accessToken;
    // @ts-ignore
    this.accessTokenExpiry = new Date(authResult.idTokenPayload.exp * 1000);

    localStorage.setItem(localStorageKey, 'true');

    this.emit(loginEvent, {
      loggedIn: true,
      // @ts-ignore
      idTokenPayload: authResult.idTokenPayload,
      // @ts-ignore
      state: authResult.appState || {},
    });
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err: any, authResult: any) => {
        if (err) {
          return reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  };

  renewTokens = () => {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        return reject('Not logged in');
      }

      webAuth.checkSession({}, (err: any, authResult: any) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  };

  signOut = () => {
    localStorage.removeItem(localStorageKey);

    this.idToken = null;
    this.idTokenPayload = null;
    this.accessToken = null;
    this.accessTokenExpiry = null;

    webAuth.logout({
      returnTo: `${window.location.protocol}//${window.location.host}${homepage}`,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    });

    this.emit(loginEvent, { loggedIn: false });
  };

  isAccessTokenValid() {
    // @ts-ignore
    return this.accessToken && this.accessTokenExpiry && Date.now() < this.accessTokenExpiry;
  }

  getAccessToken = () => {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        resolve(this.accessToken);
      } else {
        this.renewTokens().then((authResult) => {
          // @ts-ignore
          resolve(authResult.accessToken);
        }, reject);
      }
    });
  };

  isAuthenticated = () => {
    return this.isAccessTokenValid() && localStorage.getItem(localStorageKey) === 'true';
  };
}

export default new AuthService();
