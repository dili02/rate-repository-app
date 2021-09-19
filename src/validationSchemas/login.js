import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    userName: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be greater or equal to 2"),
    password: yup
    .string()
    .required("Password is required")
    .min(5, "Password  must be greater or equal to 5")
});
