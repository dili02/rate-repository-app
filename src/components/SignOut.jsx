import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-native";
import authStorage from "../utils/authStorage";

const SignOut = () => {
  const apolloClient = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    async function signOut() {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      history.push("/");
    }
    signOut();
  }, []);

  return null;
};

export default SignOut;
