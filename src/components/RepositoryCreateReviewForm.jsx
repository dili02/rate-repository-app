import React from "react";
import { Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import useReview from "../hooks/useReview.js";
import { useHistory } from "react-router-native";
import { reviewValidationSchema } from "../validationSchemas/review.js";

import Form from "./Form.jsx";
import TextInputFormik from "./TextInputFormik.jsx";
import Text from "./Text.jsx";

import theme from "../theme.js";

const initialValues = {
  repositoryOwnerName: "",
  repositoryName: "",
  rating: "",
  review: "",
};

const RepositoryCreateReviewForm = () => {
  const { createReview } = useReview();
  const history = useHistory();

  const handleFormSubmit = async (value, actions) => {
    actions.setSubmitting(true);

    try {
      const { repositoryOwnerName, repositoryName, rating, review } = value;
      const response = await createReview({
        repositoryOwnerName,
        repositoryName,
        rating,
        review,
      });

      actions.setSubmitting(false);

      history.push(`/repository/${response.data.createReview.repositoryId}`);
    } catch (error) {
      const { message } = error;
      seterror(message.slice(15));
    }

    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={reviewValidationSchema}
    >
      {({ handleSubmit, isSubmitting, status }) => {
        return (
          <Form>
            <TextInputFormik
              placeholder="Repository owner name"
              name="repositoryOwnerName"
            />

            <TextInputFormik
              placeholder="Repository name"
              name="repositoryName"
            />

            <TextInputFormik
              placeholder="Rating between 0 and 100"
              name="rating"
            />

            <TextInputFormik
              placeholder="Review"
              name="review"
              multiline={true}
            />

            <Button
              disabled={isSubmitting}
              onPress={handleSubmit}
              title="Create a review"
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

export default RepositoryCreateReviewForm;
