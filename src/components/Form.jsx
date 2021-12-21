import React from "react";
import { View, StyleSheet } from "react-native";

const Form = ({ children }) => {
  return <View style={styles.form}>{children}</View>;
};

const styles = StyleSheet.create({
  form: {
    margin: 12,
  },
  errorForm: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
    marginTop: 20,
  },
});

export default Form;
