import * as yup from "yup";

export const signupValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .number()
    .oneOf([yup.ref("password"), null])
    .required("Password Confrimation is required"),
});
