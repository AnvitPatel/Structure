import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Demo from "container/Demo";
import Demo1 from "container/Demo1";
import Demo2 from "container/Demo2";

const routes = [
  {
    path: "/",
    exact: true,
    AuthRoute: true,
    component: Demo,
  },
  {
    path: "/demo1",
    exact: true,
    AuthRoute: false,
    component: Demo1,
  },
  {
    path: "/demo2",
    exact: true,
    AuthRoute: true,
    component: Demo2,
  },
];
const PrivateRoute = ({ component: Component, ...rest }) => {
    // if (getAuthUserID()) 
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    // } else {
    //   return <Redirect to="/" />; 
    // }
  };
  const RestrictedRoute = ({ component: Component, publicAccess, ...rest }) => {
    debugger;
    // if (getAuthUserID()) {
      return (
        <Route
          {...rest}
          render={(props) =>
            publicAccess ? <Component {...props} /> : <Redirect to={"/"} />
          }
        />
      );
    // } else {
    //   return <Route {...rest} render={(props) => <Component {...props} />} />;
    // }
  };
class Routes extends Component {
  render() {
    return (
        <Suspense fallback={<Demo2 />}>
        <Switch>
          {routes.map((route, index) => {
            return !route.AuthRoute ? (
              <RestrictedRoute {...route} key={index} />
            ) : (
              <PrivateRoute {...route} key={index} />
            );
          })}
          <Route render={(props) =><>{"Error"}</>} />
        </Switch>
      </Suspense>
    );
  }
}
export default Routes;
