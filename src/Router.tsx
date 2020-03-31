import React from 'react';
import { Route, Switch } from 'react-router';

import IndexPage from './pages/IndexPage';
import DashboardPage from './pages/DashboardPage';
import EmptyPage from './pages/EmptyPage';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route path="*" component={EmptyPage} />
    </Switch>
  );
};
