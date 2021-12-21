import React from "react";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";

import theme from "../theme.js";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import Signin from "./Signin.jsx";
import Signout from "./SignOut.jsx";
import RepositorySingle from "./RepositorySingle.jsx";
import RepositoryCreateReviewForm from "./RepositoryCreateReviewForm.jsx";
import Signup from "./Signup.jsx";
import RepositoryUserReviews from "./RepositoryUserReviews.jsx";

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repository/:id" exact>
          <RepositorySingle />
        </Route>
        <Route path="/create-review" exact>
          <RepositoryCreateReviewForm />
        </Route>
        <Route path="/my-reviews" exact>
          <RepositoryUserReviews />
        </Route>
        <Route path="/signin" exact>
          <Signin />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/signout" exact>
          <Signout />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.secondary,
  },
});

export default Main;
