import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_REVIEW, DELETE_REVIEW } from "../graphql/mutations.js";

const useReview = () => {
  const apolloClient = useApolloClient();

  const createReview = async ({
    repositoryOwnerName,
    repositoryName,
    rating,
    review,
  }) => {
    const [createReviewMutation] = useMutation(CREATE_REVIEW);
    const reviewCreated = await createReviewMutation({
      variables: {
        repositoryOwnerName,
        repositoryName,
        rating,
        review,
      },
    });

    apolloClient.resetStore();

    return reviewCreated;
  };

  const deleteReview = async (id) => {
    const [deleteReviewMutation] = useMutation(DELETE_REVIEW);

    const deletedReview = await deleteReviewMutation({ variables: id });

    apolloClient.resetStore();

    return deletedReview;
  };

  return {
    createReview,
    deleteReview,
  };
};

export default useReview;
