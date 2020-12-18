import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {AuthRoutes, AppRoutes} from "./routes/routes-const";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import PrivateRoute from "./shared/components/AuthPrivateRoute";
import MyOffice from './pages/MyOffice';
import UploadBook from './pages/UploadBook';
import BookDetailed from './pages/BookDetailed';
import UserProfile from './pages/UserProfile';
import EditBook from './pages/EditBook';
import Books from './pages/Books';

const App: React.FC = () => {
  return (
		<Switch>
			<Route exact={true} path={AuthRoutes.SIGN_IN} component={SignIn} />
			<Route exact={true} path={AuthRoutes.SIGN_UP} component={SignUp} />
	
			<Route exact={true} path={'/'} component={Home} />
			<Route exact={true} path={AppRoutes.BOOKS + '/:category'} component={Books} />
			<Route exact={true} path={AppRoutes.EDIT_BOOK + '/:bookId'} component={EditBook} />
			<Route exact={true} path={AppRoutes.BOOKS + AppRoutes.BOOK_DETAILED + '/:bookId'} component={BookDetailed} />
			<Route exact={true} path={AppRoutes.USER_PROFILE + '/:userId'} component={UserProfile} />
			<PrivateRoute exact={true} path={AppRoutes.MY_OFFICE} component={MyOffice} />
			<PrivateRoute exact={true} path={AppRoutes.UPLOAD_BOOK} component={UploadBook} />
			<Redirect to={'/'} />
		</Switch>
  );
};

export default App;
