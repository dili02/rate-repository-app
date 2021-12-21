import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput.jsx";
import Text from "./Text.jsx";
import theme from "../theme.js";

const TextFormikInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: -10,
    marginBottom: 25,
    color: theme.colors.danger,
  },
});

export default TextFormikInput;
