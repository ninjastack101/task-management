import React from "react";
import { FormattedMessage } from "react-intl";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Button
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";

import { makeStyles } from "@material-ui/core/styles";

import messages from "./messages";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

function Header({ isLoggedIn, logout }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <FormattedMessage {...messages.name} />
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
