import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Link, useLocation } from "react-router-native";
import useAuthorizedUser from "../hooks/useAuthorizedUser";
import Text from "./Text";
import theme from "../theme";

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  const textStyle = [styles.appBar, active && styles.active];

  return (
    <Link to={to}>
      <Text
        color="textSecondary"
        fontWeight="bold"
        fontSize="subheading"
        style={textStyle}
      >
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const { isAuthorized } = useAuthorizedUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {isAuthorized ? (
          <View style={styles.tabContainer}>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarTab to="/my-reviews">My reviews</AppBarTab>
            <AppBarTab to="/signout">SignOut</AppBarTab>
          </View>
        ) : (
          <View style={styles.tabContainer}>
            <AppBarTab to="/signin">SignIn</AppBarTab>
            <AppBarTab to="/signup">SignUp</AppBarTab>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: "row",
  },
  appBar: {
    paddingHorizontal: 10,
  },
  active: {
    color: theme.colors.white,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default AppBar;
