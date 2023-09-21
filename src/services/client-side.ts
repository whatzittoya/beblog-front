
import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";

export const getBlogpostsClient = () => {
    const GetBlogposts = gql(/* GraphQL */ `
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
    const all = useQuery(GetBlogposts);

    return all
}