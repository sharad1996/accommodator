import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import './assets/styles/index.scss';
import Layout from './components/common/layout';
import PlanPage from './pages/plan';
import LeadsSearch from './pages/leads';
import ActivateAccount from './pages/ActivateAccount';
import LandingPage from './pages/landingPage';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';

class AppRoutes extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact>
              <LandingPage />
            </Route>
            <Route path='/map-search' exact>
              <LeadsSearch />
            </Route>
            <PrivateRoute exact path='/plans' component={PlanPage} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PublicRoute exact path='/reset-password' component={ResetPassword} />
            <PublicRoute exact path='/activate-account' component={ActivateAccount} />
            <PrivateRoute exact path='/dashboard' component={PlanPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('accessToken');
  return <Route {...rest} render={props => (token ? <Component {...props} /> : <Redirect to='/' />)} />;
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('accessToken');
  return <Route {...rest} render={props => (!token ? <Component {...props} /> : <Redirect to='/profile' />)} />;
};

const App = () => (
  <Router>
    <Route>
      <AppRoutes />
    </Route>
  </Router>
);

export default App;
