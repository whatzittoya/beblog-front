import '@/styles/globals.css'
import Layout from '../components/Layout'

import { ApolloProvider } from "@apollo/client"

import createApolloClient from '../provider/apollo-client'

export default function App({ Component, pageProps }) {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}