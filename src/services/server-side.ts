// import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import createApolloClient from "../provider/apollo-client";
const client = createApolloClient();

import blogpost from '../static_data/blogpost.json' assert { type: 'json' };
import slugs from '../static_data/slugs.json' assert { type: 'json' };

const localData = false

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
  if (localData)
    return blogpost.data

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
  if (localData) {
    const filter = (blogpost.data.blogposts).filter((el) => el.slug === slug)
    const data_filter = { blogpost: filter[0] }
    return data_filter
  }

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


  if (localData)
    return slugs.data

  const { data } = await client.query({ query: GET_SLUGS });

  return data


}
