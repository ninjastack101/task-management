/**
 * app.js
 *
 */

// Needed for redux-saga es6 generator support
import "@babel/polyfill";

// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import history from "utils/history";

import "react-toastify/dist/ReactToastify.css";
import "sanitize.css/sanitize.css";

// Import root app
import App from "containers/App";

// Import Language Provider
import LanguageProvider from "containers/LanguageProvider";

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import "!file-loader?name=[name].[ext]!./images/favicon.ico";
import "file-loader?name=.htaccess!./.htaccess";
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from "./configureStore";

// Import i18n messages
import { translationMessages } from "./i18n";

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("app");

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  module.hot.accept(["./i18n", "containers/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import("intl"));
  })
    .then(() => Promise.all([import("intl/locale-data/jsonp/en.js")]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install(); // eslint-disable-line global-require
}
