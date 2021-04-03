// in src/MyLoginPage.js
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
import { TextField, CardActions, Button, Card } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

interface props {
  theme?: string
}
const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: '#f3e1c7',

  },
  input: {
    marginTop: '1em',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  button: {
    width: '100%',
    length: '20%',
    color: 'black',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  card: {
    minWidth: 400,
    marginTop: '6em',
  },
}));

export const LoginPage = ({ theme }: any) => {
  const classes: any = useStyles();
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
        <div className={classes.form}>
          <div className={classes.card}>


            <div className={classes.input}>
              <TextField
                variant="filled"
                name="email"
                label={'Email'}
                size="small"
                fullWidth={true}

                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <TextField
                name="password"
                label={'Password'}
                type="password"
                variant="filled"
                size="small"
                fullWidth={true}
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>

            <CardActions>
              <Button
                variant="contained"
                type="submit"
                color="inherit"
                className={classes.button}
              >
                Login
          </Button>
            </CardActions>
          </div>
        </div>
      </form>


      <Notification />
    </ThemeProvider>
  );
};