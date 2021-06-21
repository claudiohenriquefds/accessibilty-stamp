import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Panel from './Panel';
import History from './History';
import Sites from './Sites';
import Stamp from './Stamp';

function Dashboard(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/panel`} component={Panel} />
      <Route path={`${match.path}/history`} component={History} />
      <Route path={`${match.path}/sites`} component={Sites} />
      <Route path={`${match.path}/stamp`} component={Stamp} />
    </Switch>
  );
}

export default Dashboard;
