// in src/MyLoginPage.js
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

interface props {
  theme?: string
}


export const LoginPage = ({ theme }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password }).catch(() =>
      notify('Invalid email or password')
    );
  };

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <form onSubmit={submit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      <Notification />
    </ThemeProvider>
  );
};