// ./apollo-client.js

import { ApolloClient, HttpLink, InMemoryCache, DefaultOptions } from '@apollo/client';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const createApolloClient = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}`,
        }),
        ssrMode: typeof window === 'undefined',
        defaultOptions: defaultOptions
    });
};

export default createApolloClient;