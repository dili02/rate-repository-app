import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations.js";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext.js";

//import authStorage from "../utils/authStorage";
const useSignIn = () => {
  const [signInMutation] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data, errors } = await signInMutation({
      variables: {
        username,
        password,
      },
    });

    await authStorage.setAccessToken(data.authorize.accessToken);
    await apolloClient.resetStore();

    return { data, errors };
  };

  return {
    signIn,
  };
};

export default useSignIn;
