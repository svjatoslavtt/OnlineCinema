import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {AuthRoutes, ContentRoutes} from "./routes/routes-const";
import NewsFeed from "./pages/NewsFeed";
import SignIn from "./pages/Auth/SignIn";

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path={ContentRoutes.NEWS_FEED} component={NewsFeed} />
      <Route exact path={AuthRoutes.SIGN_IN} component={SignIn} />
      <Redirect to={ContentRoutes.NEWS_FEED} />
    </Switch>
  )
}

export default App;
