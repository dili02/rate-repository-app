import React from "react";
import { View, Image, StyleSheet, Button } from "react-native";
import * as Linking from "expo-linking";
import Text from "./Text.jsx";

import theme from "../theme.js";

const RepositoryItem = ({ item = {}, isSingleRepository = false }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = item;

  const parseThousands = (value) => {
    return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
        </View>
        <View style={styles.infoContainer}>
          <Text
            fontWeight="bold"
            fontsize="subheading"
            testID="repository-fullname"
          >
            {fullName}
          </Text>
          <Text color="textSecondary" testID="repository-description">
            {description}
          </Text>
          <Text style={styles.language} testID="repository-language">
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {parseThousands(stargazersCount)}
          </Text>
          <Text style={styles.alignCenter} color="textSecondary">
            Stars
          </Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {parseThousands(forksCount)}
          </Text>
          <Text style={styles.alignCenter} color="textSecondary">
            Forks
          </Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {parseThousands(reviewCount)}
          </Text>
          <Text style={styles.alignCenter} color="textSecondary">
            Reviews
          </Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight="bold">
            {parseThousands(ratingAverage)}
          </Text>
          <Text style={styles.alignCenter} color="textSecondary">
            Rating
          </Text>
        </View>
      </View>
      {isSingleRepository && (
        <Button
          title="Open in GITHUB"
          onPress={() => Linking.openURL(item.url)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: "row",
    paddingBottom: 2,
  },
  imageContainer: {
    flexGrow: 0,
  },
  infoContainer: {
    paddingLeft: 10,
    flexDirection: "column",
    flexGrow: 1,
  },
  alignCenter: {
    textAlign: "center",
  },
  language: {
    padding: 5,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginVertical: 5,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 5,
  },
  footer: {
    padding: 5,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default RepositoryItem;
