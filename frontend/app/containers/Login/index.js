import history from "utils/history";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import messages from "./messages";
import { signUpUser } from "./actions";
import reducer from "./reducer";
import saga from "./saga";

const key = "login";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function LoginPage({ onSubmitForm }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  const onSubmit = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    const { username } = evt.target.elements;
    if (!username.value.trim()) return;
    onSubmitForm(username.value.trim());
    history.push("/home");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Helmet>
        <title>Login Page</title>
        <meta name="description" content="A React.js application login page" />
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage {...messages.signIn} />
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <FormattedMessage {...messages.signIn} />
          </Button>
        </form>
      </div>
    </Container>
  );
}

LoginPage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  redirect: PropTypes.func
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: username => {
      dispatch(signUpUser(username));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(LoginPage);
