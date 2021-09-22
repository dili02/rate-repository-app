import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import ReposotoryItem from "./ReposotoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <ReposotoryItem item={item} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      // other props
    />
  );
};

export default RepositoryList;
