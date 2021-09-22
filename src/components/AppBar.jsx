import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Link, useLocation } from "react-router-native";
import useAuthorizedUser from "../hooks/useAuthorizedUser";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.appBarTab,
    flexDirection: "row",
  },
  appBar: {
    paddingHorizontal: 10,
  },
  active: {
    color: theme.colors.white,
  },
});

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
        {isAuthorized
          ? <AppBarTab to="/signout">SignOut</AppBarTab>
          : <AppBarTab to="/signin">SignIn</AppBarTab>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
