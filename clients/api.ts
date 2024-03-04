import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

const graphqlClient = new GraphQLClient("http://localhost:8000/graphql", {
  headers: () => ({
    Authorization: isClient
      ? `Bearer ${window.localStorage.getItem("__twitter_token")}`
      : "",
  }),
});

export default graphqlClient;
