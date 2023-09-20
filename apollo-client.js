// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        uri: 'https://ap-northeast-1.cdn.hygraph.com/content/clmolp6vo2lzi01uj0bl30xxt/master',
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;