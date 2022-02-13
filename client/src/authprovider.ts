import { AuthProvider } from 'react-admin'
// import decodeJwt from 'jwt-decode';
import { SERVER_URL } from './constants';

export const authProvider: AuthProvider = {
  login: ({ email, password }) => {
    return fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(auth => {
      localStorage.setItem('auth', JSON.stringify(auth));
    }).catch(() => {
      throw new Error('Network error');
    })
  },
  // Storing the auth variables in localstorage, possibly store ih javascript object instead
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () => localStorage.getItem('auth')
    ? Promise.resolve()
    : Promise.reject(),
  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },

  // CONSIDER: change permission return to roles
  getPermissions: () => {
    const role = localStorage.getItem('auth');
    return role ? Promise.resolve(role) : Promise.reject();
  }
}
