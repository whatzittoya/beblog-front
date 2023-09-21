// import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import createApolloClient from "../../apollo-client";
const client = createApolloClient();

export const getBlogposts = async () => {
  const GET_BLOGPOSTS = gql(/* GraphQL */ `
    query getBlogposts {
      blogposts {
        title
        slug
        coverImage {
          url
        }
        excerpt
        id
        author {
          name
        }
      }
    }
  `
  )
  const { data } = await client.query({ query: GET_BLOGPOSTS });

  return data
}

export const getBlogpost = async (slug) => {
  const GET_BLOGPOST = gql(/* GraphQL */`
  query getBlogpost($slug: String!) {
    blogpost(where: { slug: $slug }) {
      title
      author {
        name
      }
      content {
        markdown
      }
      coverImage {
        altText
        url
      }
    }
  }
  `);

  const { data } = await client.query({ query: GET_BLOGPOST, variables: { slug: slug } });
  return data


}

export const getSlugs = async () => {
  const GET_SLUGS = gql(/* GraphQL */`
    query getSlugs {
      blogposts {
        slug
      }
    }
  `);


  const { data } = await client.query({ query: GET_SLUGS });
  return data


}
