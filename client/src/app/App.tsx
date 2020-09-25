import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {AuthRoutes, AppRoutes} from "./routes/routes-const";
import NewsFeed from "./pages/NewsFeed";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NavBar from "./shared/components/NavBar";
import PrivateRoute from "./shared/components/AuthPrivateRoute";
import MyOffice from './pages/MyOffice';
import UploadFilm from './pages/MyOffice/page/UploadFilm';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact={true} path={AppRoutes.NEWS_FEED} component={NewsFeed} />
				<PrivateRoute exact={true} path={AppRoutes.MY_OFFICE} component={MyOffice} />
        <Route exact={true} path={AuthRoutes.SIGN_IN} component={SignIn} />
        <Route exact={true} path={AuthRoutes.SIGN_UP} component={SignUp} />
				<Route exact={true} path={AppRoutes.UPLOAD_FILM} component={UploadFilm} />
        <Redirect to={AppRoutes.NEWS_FEED} />
      </Switch>
    </>
  )
}

export default App;
