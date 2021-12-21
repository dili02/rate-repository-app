import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, searchKeyword, first }) => {
  let variables;

  if (orderBy === "HighestRatedRepositories") {
    variables = {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
      searchKeyword,
      first,
    };
  }

  if (orderBy === "LowestRatedRepositories") {
    variables = {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
      searchKeyword,
      first,
    };
  }

  if (orderBy === "LatestRepositories") {
    variables = {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword,
      first,
    };
  }

  const {
    data = {},
    loading,
    error,
    fetchMore,
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "network-only",
    variables,
  });

  const { repositories = null } = data;

  const handleFetchMore = () => {
    const canFetchMore = !loading && repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return {
    repositories: repositoryNodes,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
