import { useQuery } from "@apollo/client";
import { AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = () => {
  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });

  const isAuthorized =
    data?.authorizedUser !== null && data !== undefined;

  return {
    isAuthorized
  };
};

export default useAuthorizedUser;
