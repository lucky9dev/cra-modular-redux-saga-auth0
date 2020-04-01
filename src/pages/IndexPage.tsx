import React from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import AuthService from '../services/auth';

export default function IndexPage() {
  // @ts-ignore
  const auth0 = useSelector((store) => store.auth0);

  if (auth0.authenticated) return <Redirect to="/dashboard" />;
  // @ts-ignore
  return <div>{AuthService.signIn()}</div>;
}
