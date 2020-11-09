import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {AuthRoutes, AppRoutes} from "./routes/routes-const";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NavBar from "./shared/components/NavBar";
import PrivateRoute from "./shared/components/AuthPrivateRoute";
import MyOffice from './pages/MyOffice';
import UploadBook from './pages/UploadBook';
import BookDetailed from './pages/BookDetailed';
import UserProfile from './pages/UserProfile';
import EditBook from './pages/EditBook';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact={true} path={AuthRoutes.SIGN_IN} component={SignIn} />
        <Route exact={true} path={AuthRoutes.SIGN_UP} component={SignUp} />
				<Route exact={true} path={AppRoutes.NEWS_FEED} component={Home} />
				<Route exact={true} path={AppRoutes.EDIT_BOOK + '/:filmId'} component={EditBook} />
				<Route exact={true} path={AppRoutes.BOOK_DETAILED + '/:filmId'} component={BookDetailed} />
				<Route exact={true} path={AppRoutes.USER_PROFILE + '/:userId'} component={UserProfile} />
				<PrivateRoute exact={true} path={AppRoutes.MY_OFFICE} component={MyOffice} />
				<PrivateRoute exact={true} path={AppRoutes.UPLOAD_BOOK} component={UploadBook} />
        <Redirect to={AppRoutes.NEWS_FEED} />
      </Switch>
    </>
  );
};

export default App;
