import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {AuthRoutes, AppRoutes} from "./routes/routes-const";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import UploadBook from './pages/MyOffice/UploadBook';
import BookDetailed from './pages/BookDetailed';
import EditBook from './pages/EditBook';
import Catalog from './pages/Catalog';
import Genres from './pages/Genres';
import MyOffice from './pages/MyOffice';
import Cart from './pages/Cart';
import PrivateRoute from './shared/components/AuthPrivateRoute';

const App: React.FC = () => {
  return (
		<Switch>
			<Route exact={true} path={AuthRoutes.SIGN_IN} component={SignIn} />
			<Route exact={true} path={AuthRoutes.SIGN_UP} component={SignUp} />
	
			<Route exact={true} path={'/'} component={Home} />
			<Route exact={true} path={AppRoutes.Catalog + '/:category'} component={Catalog} />
			<Route exact={true} path={AppRoutes.EDIT_BOOK + '/:bookId'} component={EditBook} />
			<Route exact={true} path={AppRoutes.BOOK_DETAILED + '/:bookId'} component={BookDetailed} />
			<Route exact={true} path={AppRoutes.GENRES} component={Genres} />
			<PrivateRoute exact={true} path={AppRoutes.MY_OFFICE} component={MyOffice} />
			<Route exact={true} path={AppRoutes.CART} component={Cart} />
			<Route exact={true} path={AppRoutes.UPLOAD_BOOK} component={UploadBook} />
			<Redirect to={'/'} />
		</Switch>
  );
};

export default App;
