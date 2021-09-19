import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const RepositoryItemHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.ownerAvatarUrl }} />
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight="bold">{props.fullName}</Text>
        <Text color="textSecondary">{props.description}</Text>
        <Text style={styles.language}>{props.language}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 2,
  },
  infoContainer: {
      paddingLeft: 10,
      flexDirection: "column",
      flexGrow: 1
  },
  imageContainer: {
      flexGrow: 0
  },
  alaign: {
    textAlign: "center",
  },
  language: {
    padding: 5,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginVertical: 5
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 5
  },
});

export default RepositoryItemHeader;
