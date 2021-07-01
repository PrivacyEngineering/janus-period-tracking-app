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
import reportWebVitals from './reportWebVitals';
let appJWTToken
const httpLink = new HttpLink({uri: 'https://graphql-jwt-tutorial.herokuapp.com/v1/graphql'})
const authMiddleware = new ApolloLink((operation, forward)=> {
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
