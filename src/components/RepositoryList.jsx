import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItemTouchable from "./RepositoryItemTouchable.jsx";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";

//import { repositories } from "../utils/fakeData.js";
import useRepositories from "../hooks/useRepositories.js";

const ItemSeparator = () => <View style={styles.separator} />;

const RenderItem = ({ item }) => <RepositoryItemTouchable item={item} />;

const RepositoryListHeader = ({
  orderBy,
  setOrderBy,
  searchKeyword,
  setSearchKeyword,
}) => {
  const onChangeSearch = (query) => setSearchKeyword(query);

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchKeyword}
        style={styles.searchbar}
        searchKeyword={searchKeyword}
        setFilter={setSearchKeyword}
      />
      <Picker
        style={styles.picker}
        selectedValue={orderBy}
        onValueChange={(itemValue) => setOrderBy(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="LatestRepositories" />
        <Picker.Item
          label="Highest rated repositories"
          value="HighestRatedRepositories"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="LowestRatedRepositories"
        />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  orderBy,
  setOrderBy,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RenderItem}
        ListHeaderComponent={() => (
          <RepositoryListHeader
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        )}
        testID="repository-list"
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("LatestRepositories");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { repositories, fetchMore } = useRepositories({
    orderBy,
    searchKeyword,
    first: 4,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View>
      <RepositoryListContainer
        repositories={repositories}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onEndReach={onEndReach}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    margin: 15,
  },
  searchbar: {
    margin: 15,
    marginBottom: 5,
  },
});

export default RepositoryList;
