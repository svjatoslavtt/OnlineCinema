import React from "react";
import { RouteProps, Redirect, Route } from "react-router-dom";
import {AppRoutes} from "../../../routes/routes-const";
import {useSelector} from "react-redux";
import {getAuthToken} from "../../../redux/auth/selectors";

type PrivateRouteTypes = {
  component: React.FC;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteTypes> = ({ component: Component, ...rest}) => {
  const token = useSelector(getAuthToken);

  const onRender = (props: RouteProps) => {
    if (token) {
      return <Component { ...props } />
    } else {
      return (
        <Redirect
          to={{
            pathname: AppRoutes.NEWS_FEED,
            state: { from: props.location }
          }}
        />
      )
    }
  }

  return (
    <Route {...rest} render={onRender} />
  )
}

export default PrivateRoute;