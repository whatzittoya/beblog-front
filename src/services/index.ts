// import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { GetSlugsDocument, GetBlogpostDocument, GetBlogpostsDocument, GetBlogpostsQuery, GetBlogpostsQueryVariables } from "@/__generated__/graphql";

import createApolloClient from "../../apollo-client";

export const getBlogposts = async () => {
  const client = createApolloClient();
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
  const { loading, data } = useQuery(GET_BLOGPOSTS);
  return data?.blogposts
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

  const { loading, data } = useQuery(
    GET_BLOGPOST, { variables: { slug: slug } }
  );
  return data?.blogpost
}

export const getSlugs = async () => {
  const GET_SLUGS = gql(/* GraphQL */`
    query getSlugs {
      blogposts {
        slug
      }
    }
  `);
  const { loading, data } = useQuery(
    GET_SLUGS
  );
  return data?.blogposts
}
