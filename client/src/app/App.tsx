import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {AuthRoutes, AppRoutes} from "./routes/routes-const";
import NewsFeed from "./pages/NewsFeed";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NavBar from "./shared/components/NavBar";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={AppRoutes.NEWS_FEED} component={NewsFeed} />
        <Route exact path={AuthRoutes.SIGN_IN} component={SignIn} />
        <Route exact path={AuthRoutes.SIGN_UP} component={SignUp} />
        <Redirect to={AppRoutes.NEWS_FEED} />
      </Switch>
    </>
  )
}

export default App;
