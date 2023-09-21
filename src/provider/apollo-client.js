// ./apollo-client.js

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: 'https://ap-northeast-1.cdn.hygraph.com/content/clmolp6vo2lzi01uj0bl30xxt/master',
        }),
        ssrMode: typeof window === 'undefined',
    });
};

export default createApolloClient;