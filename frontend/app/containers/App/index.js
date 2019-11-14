import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import HomePage from "containers/HomePage/Loadable";
import LoginPage from "containers/Login/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import Header from "components/Header";
import { makeSelectUserDetails } from "./selectors";
import { logout } from "../Login/actions.js";

import GlobalStyle from "../../global-styles";

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

function PrivateRoute({ component: Component, userDetails, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        userDetails.userId ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
PrivateRoute.propTypes = {
  userDetails: PropTypes.object,
  location: PropTypes.any,
  component: PropTypes.elementType.isRequired
};
function AuthRoute({ component: Component, userDetails, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !userDetails.userId ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
AuthRoute.propTypes = {
  userDetails: PropTypes.object,
  location: PropTypes.any,
  component: PropTypes.elementType.isRequired
};

export function App({ userDetails, dispatch }) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Task Management"
        defaultTitle="React.js Task Management"
      >
        <meta
          name="description"
          content="A React.js Task Management application"
        />
      </Helmet>
      <Header
        isLoggedIn={!!userDetails.userId}
        logout={() => dispatch(logout())}
      />
      <Switch>
        <AuthRoute
          exact
          path="/"
          component={LoginPage}
          userDetails={userDetails}
        />
        <PrivateRoute
          path="/home"
          component={HomePage}
          userDetails={userDetails}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails()
});

App.propTypes = {
  userDetails: PropTypes.object
};

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(App);
