import React from "react";
import { FlatList, View, StyleSheet, Button } from "react-native";
import { useParams } from "react-router";
import useRepository from "../hooks/useRepository.js";
import RepositoryItem from "./RepositoryItem";
import { format } from "date-fns";
import Text from "./Text.jsx";
import theme from "../theme.js";

const RepositorySingle = () => {
  const { id } = useParams();
  const { repository, reviews } = useRepository(id);

  const RepositoryReview = ({ review }) => {
    const { createdAt, rating, text, user } = review;

    const dateFormat = (date) => format(new Date(date), "dd.MM.yyyy");

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.rating}>
            <Text color="primary" fontWeight="bold">
              {rating}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold">{user.username}</Text>
          <Text color="textSecondary">{dateFormat(createdAt)}</Text>
          <Text>{text}</Text>
        </View>
      </View>
    );
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <RepositoryReview review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} isSingleRepository />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFF",
    marginTop: 15,
  },
  infoContainer: {
    flexDirection: "column",
    flex: 1,
    flexGrow: 1,
    marginLeft: 10,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RepositorySingle;
