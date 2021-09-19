import React from "react";
import { Formik, useField } from "formik";
import { loginValidationSchema } from '../validationSchemas/login.js';
import { Button, View, StyleSheet } from "react-native";
import TextInput from "./TextInput";
import Text from './Text';

const initialValues = {
  userName: "",
  password: "",
};

const styles = StyleSheet.create({
  form: {
    margin: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
    marginTop: -10
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        value={field.value}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        error={showError}
        { ...props }
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

const SignIn = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      validationSchema={loginValidationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.form}>
            <FormikTextInput
              placeholder="Username"
              name="userName"
            />
            <FormikTextInput
              placeholder="Password"
              name="password"
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="LOGIN" />
          </View>
        );
      }}
    </Formik>
  );
};

export default SignIn;
