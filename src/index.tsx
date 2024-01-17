import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Apollo
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
// Realm
import * as Realm from "realm-web";

// To set up your app:
//
// 1. Link a cluster that includes the MongoDB Atlas sample data sets
// 2. Configure permissions for the ``sample_mflix.movies`` collection. For this
//    demo, you can assign full read/write permissions to the default role.
// 3. Generate a collection schema for the ``sample_mflix.movies`` collection.
// 4. Enable anonymous authentication
// 5. Deploy your changes
//
// Once your app is set up, replace the value of APP_ID with your App ID
export const APP_ID = "";

// Connect to your MongoDB Realm app
const app = new Realm.App(APP_ID);

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }

  return app.currentUser?.accessToken;
}

let accessToken: string | null | undefined = undefined;

// Configure the ApolloClient to connect to your app's GraphQL endpoint
export const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      if (!accessToken) accessToken = await getValidAccessToken();
      options!.headers! = { Authorization: `Bearer ${accessToken}` };
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
