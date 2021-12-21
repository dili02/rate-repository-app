import { gql } from "apollo-boost";

export const REVIEWS_FRAGMENT = gql`
  fragment reviewsData on ReviewConnection {
    edges {
      node {
        id
        text
        createdAt
        rating
        repositoryId
        user {
          username
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
`;
