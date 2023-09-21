// ./apollo-client.js

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}`,
        }),
        ssrMode: typeof window === 'undefined',
    });
};

export default createApolloClient;