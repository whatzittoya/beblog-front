
import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";

export const GetBlogpostsClient = () => {
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
    const all = useQuery(GET_BLOGPOSTS);

    return all
}