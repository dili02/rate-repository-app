import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from "../validationSchemas/login.js";
import useSignIn from "../hooks/useSignin.js";
import { useHistory } from "react-router-native";

import Form from "./Form.jsx";
import TextInputFormik from "./TextInputFormik.jsx";
import Text from "./Text.jsx";

import theme from "../theme.js";

const initialValues = {
  userName: "",
  password: "",
};

const SignIn = () => {
  const { signIn } = useSignIn();
  const history = useHistory();
  const [error, seterror] = useState("");

  const handleFormSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      await signIn({
        username: values.userName,
        password: values.password,
      });

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
      validationSchema={loginValidationSchema}
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
            <Button
              disabled={isSubmitting}
              onPress={handleSubmit}
              title="LOGIN"
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

export default SignIn;
