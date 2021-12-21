import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries.js";

const useRepository = (id) => {
  const {
    data = {},
    loading,
    error,
  } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  const reviews = data?.repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return {
    repository: data && data?.repository,
    reviews,
    loading,
    error,
  };
};

export default useRepository;
