import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import RepositoryItem from "./RepositoryItem";

import theme from "../theme.js";

const RepositoryItemTouchable = ({ item }) => {
  //const TouchableRepositoryItem = ({ item }) => {
  const history = useHistory();

  return (
    <TouchableOpacity
      style={styles.container}
      testID="repository-item"
      onPress={() => history.push(`/repository/${item.id}`)}
    >
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );
};

//return <TouchableRepositoryItem item={item} />;
//};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: theme.colors.white,
  },
});

export default RepositoryItemTouchable;
