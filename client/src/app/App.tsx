import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {AuthRoutes, AppRoutes} from "./routes/routes-const";
import NewsFeed from "./pages/NewsFeed";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NavBar from "./shared/components/NavBar";
import PrivateRoute from "./shared/components/AuthPrivateRoute";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact={true} path={AppRoutes.NEWS_FEED} component={NewsFeed} />
        <PrivateRoute exact={true} path={AuthRoutes.SIGN_IN} component={SignIn} />
        <PrivateRoute exact={true} path={AuthRoutes.SIGN_UP} component={SignUp} />
        <Redirect to={AppRoutes.NEWS_FEED} />
      </Switch>
    </>
  )
}

export default App;
