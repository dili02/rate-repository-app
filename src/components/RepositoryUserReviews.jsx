import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries.js";
import { useHistory } from "react-router-native";
import { format } from "date-fns";
import { View, FlatList, StyleSheet, Button, Alert } from "react-native";
import Text from "./Text.jsx";

import theme from "../theme.js";
import useReview from "../hooks/useReview.js";

const RepositoryUserReviews = () => {
  const { data, refetch } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true },
  });

  const reviews = data?.authorizedUser
    ? data?.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviews);

  const ReviewsList = ({ item, refetch }) => {
    const { createdAt, id, rating, repositoryId, text } = item;
    const history = useHistory();
    const { deleteReview } = useReview();

    const dateFormat = (date) => format(new Date(date), "dd.MM.yyyy");

    const handleViewRepository = () => {
      history.push(`/repository/${repositoryId}`);
    };

    const handleDeleteRepository = () => {
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "DELETE",
            onPress: async () => {
              if (refetch) {
                await deleteReview(id);
                await refetch({ includeReviews: true });
              }
            },
          },
        ]
      );
    };

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
          <Text fontWeight="bold">{repositoryId}</Text>
          <Text color="textSecondary">{dateFormat(createdAt)}</Text>
          <Text>{text}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="View repository"
              color={theme.colors.primary}
              onPress={handleViewRepository}
            />
            <Button
              title="Delete review"
              color={theme.colors.danger}
              onPress={handleDeleteRepository}
            />
          </View>
        </View>
      </View>
    );
  };

  const RenderItem = ({ item }) => (
    <ReviewsList item={item} refetch={refetch} />
  );

  return (
    <View>
      <FlatList data={reviews} renderItem={RenderItem} refetch={refetch} />
    </View>
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
    padding: 10,
  },
});

export default RepositoryUserReviews;
