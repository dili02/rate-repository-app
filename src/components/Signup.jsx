import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { signupValidationSchema } from "../validationSchemas/signup";
import useSignIn from "../hooks/useSignin.js";
import useSignUp from "../hooks/useSignUp.js";
import { useHistory } from "react-router-native";

import Form from "./Form.jsx";
import TextInputFormik from "./TextInputFormik.jsx";
import Text from "./Text.jsx";

import theme from "../theme.js";

const initialValues = {
  userName: "",
  password: "",
  passwordConfirm: "",
};

const Signup = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const history = useHistory();
  const [error, seterror] = useState("");

  const handleFormSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    const { username, password, passwordConfirmation } = values;

    if (password !== passwordConfirmation) {
      seterror("passwords do not match");
      return;
    }

    try {
      await signUp({ username, password });
      await signIn({ username, password });

      history.push("/");

      actions.setSubmitting(false);
    } catch (error) {
      const { message } = error;
      seterror(message.slice(15));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={signupValidationSchema}
    >
      {({ handleSubmit, isSubmitting, status }) => {
        return (
          <Form>
            <TextInputFormik placeholder="Username" name="userName" />

            <TextInputFormik
              placeholder="Password"
              name="password"
              secureTextEntry
            />

            <TextInputFormik
              placeholder="Password confirmation"
              name="passwordConfirmation"
              secureTextEntry
            />

            <Button
              disabled={isSubmitting}
              onPress={handleSubmit}
              title="CREATE USER"
            />

            {status ? <Text style={styles.errorForm}>{error}</Text> : null}
          </Form>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  errorForm: {
    color: theme.colors.danger,
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Signup;
