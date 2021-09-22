import React from "react";
import useSignIn from "../hooks/useSignIn";
import { Formik, useField } from "formik";
import { loginValidationSchema } from "../validationSchemas/login.js";
import { Button, View, StyleSheet } from "react-native";
import TextInput from "./TextInput";
import Text from "./Text";
import { useHistory } from "react-router-native";

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
    marginTop: -10,
  },
  errorForm: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
    marginTop: 20
  }
});

const FORM_STATUS = {
  idle: "idle",
  wrongCredetials: "wrongCredentials",
};

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

const SignIn = () => {
  const { signIn } = useSignIn();
  const history = useHistory();

  const handleFormSubmit = async (values, actions) => {
    actions.setStatus(FORM_STATUS.idle);
    actions.setSubmitting(true);

    try {
      await signIn({
        username: values.userName,
        password: values.password,
      });
      history.push("/");
      actions.setSubmitting(false);
    } catch (error) {
      actions.setStatus(FORM_STATUS.wrongCredetials);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={loginValidationSchema}
    >
      {({ handleSubmit, isSubmitting, status }) => {
        return (
          <View style={styles.form}>
            <FormikTextInput placeholder="Username" name="userName" />
            <FormikTextInput
              placeholder="Password"
              name="password"
              secureTextEntry
            />
            <Button
              disabled={isSubmitting}
              onPress={handleSubmit}
              title="LOGIN"
            />
            {status === FORM_STATUS.wrongCredetials ? (
              <Text style={styles.errorForm}>Wrong Credentials</Text>
            ) : null}
          </View>
        );
      }}
    </Formik>
  );
};

export default SignIn;
