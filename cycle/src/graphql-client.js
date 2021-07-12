import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  ApolloLink,
  concat,
  HttpLink,
  gql
} from "@apollo/client";
let appJWTToken 
const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'})
const authMiddleware = new ApolloLink((operation, forward)=> {
//if in local storage
if (appJWTToken) {
  operation.setContext({
  headers: {
    Authorization: `Bearer ${appJWTToken}`
  }
});
}
  return forward(operation);
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
