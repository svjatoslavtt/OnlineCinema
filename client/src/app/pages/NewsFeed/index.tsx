import React from "react";
import {NavLink} from "react-router-dom";

import {AuthRoutes} from "../../routes/routes-const";

const NewsFeed: React.FC = () => {
  return (
    <div>
      News Feed!

      <NavLink to={AuthRoutes.SIGN_IN}>
        auth
      </NavLink>
    </div>
  )
}

export default NewsFeed;