import React from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { authenticate } from '../store/modules/auth0/actions';

export default function CallbackPage() {
  const dispatch = useDispatch();
  // @ts-ignore
  const auth0 = useSelector((store) => store.auth0);

  if (auth0.authenticated) return <Redirect to="/dashboard" />;

  if (!auth0.authenticatePending && !auth0.authenticateError) dispatch(authenticate());

  if (!auth0.authenticatePending && auth0.authenticateError) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Error: {auth0.authenticateError.message || auth0.authenticateError.error}
        </Typography>

        <pre>{JSON.stringify(auth0.authenticateError)}</pre>
      </Container>
    );
  }

  return <CircularProgress />;
}
