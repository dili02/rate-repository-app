import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";

const parseThousands = (value) => {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
};

const RepositoryItemStats = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.alignCenter} fontWeight="bold">
          {parseThousands(props.stargazersCount)}
        </Text>
        <Text style={styles.alignCenter} color="textSecondary">
          Stars
        </Text>
      </View>
      <View>
        <Text style={styles.alignCenter} fontWeight="bold">
          {parseThousands(props.forksCount)}
        </Text>
        <Text style={styles.alignCenter} color="textSecondary">
          Forks
        </Text>
      </View>
      <View>
        <Text style={styles.alignCenter} fontWeight="bold">
          {parseThousands(props.reviewCount)}
        </Text>
        <Text style={styles.alignCenter} color="textSecondary">
          Reviews
        </Text>
      </View>
      <View>
        <Text style={styles.alignCenter} fontWeight="bold">
          {parseThousands(props.ratingAverage)}
        </Text>
        <Text style={styles.alignCenter} color="textSecondary">
          Rating
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  alignCenter: {
    textAlign: "center"
  },
});

export default RepositoryItemStats;
