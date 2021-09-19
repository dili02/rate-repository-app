import React from "react";
import { View, StyleSheet } from "react-native";
import RepositoryItemStats from "./RepositoryItemStats";
import RepositoryItemHeader from "./RepositoryItemHeader";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#FFF",
  }
});

const ReposotoryItem = ({ item }) => {
  return (
    <View key={item.id} style={styles.container}>
      <RepositoryItemHeader {...item} />
      <RepositoryItemStats {...item} />
    </View>
  );
};

export default ReposotoryItem;
