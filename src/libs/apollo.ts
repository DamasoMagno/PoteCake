import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl41tk8ki3ie601xsb87t67qe/master",
  cache: new InMemoryCache(),
})
