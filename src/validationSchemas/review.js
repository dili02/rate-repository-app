import * as yup from "yup";

export const reviewValidationSchema = yup.object().shape({
  repositoryOwnerName: yup
    .string()
    .required("Repository Owner Name is required"),
  repositoryName: yup
    .string()
    .required("Repository Name is required")
    .min(5, "Password  must be greater or equal to 5"),
  rating: yup
    .number()
    .min(0, "Rating must be larger than 0")
    .max(100, "Rating should not be larger than 100")
    .required("Rating is required"),
});
