import React from "react";
import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../src/components/RepositoryList";

let component;

describe("<RepositoryList />", () => {
  beforeEach(() => {
    component = render(<RepositoryListContainer repositories={repositories} />);
  });

  const repositories = {
    totalCount: 8,
    pageInfo: {
      hasNextPage: true,
      endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
      startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    edges: [
      {
        node: {
          id: "jaredpalmer.formik",
          fullName: "jaredpalmer/formik",
          description: "Build forms in React, without the tears",
          language: "TypeScript",
          forksCount: 1619,
          stargazersCount: 21856,
          ratingAverage: 88,
          reviewCount: 3,
          ownerAvatarUrl:
            "https://avatars2.githubusercontent.com/u/4060187?v=4",
        },
        cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
      },
      {
        node: {
          id: "async-library.react-async",
          fullName: "async-library/react-async",
          description: "Flexible promise-based React data loader",
          language: "JavaScript",
          forksCount: 69,
          stargazersCount: 1760,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl:
            "https://avatars1.githubusercontent.com/u/54310907?v=4",
        },
        cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
      },
    ],
  };

  it("renders <RepositoryList /> correctly", () => {
    const { getAllByTestId } = component;
    expect(RepositoryListContainer).toBeDefined();
    expect(getAllByTestId("repository-list").length).toEqual(1);
  });

  it("renders repository information correctly", () => {
    const { queryAllByTestId, debug } = component;

    debug();

    const fullname = queryAllByTestId("repository-fullname");

    expect(fullname[0]).toHaveTextContent("TypeScript");
  });
});
