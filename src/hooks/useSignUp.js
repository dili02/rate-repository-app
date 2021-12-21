import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
  const [signUpMutation] = useMutation(SIGN_UP);
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    const userCreated = await signUpMutation({
      variables: {
        username,
        password,
      },
    });

    await apolloClient.resetStore();

    return userCreated;
  };

  return {
    signUp,
  };
};

export default useSignUp;
