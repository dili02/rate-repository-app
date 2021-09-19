import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  error: {
    borderColor: "red",
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.textInput, style, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
