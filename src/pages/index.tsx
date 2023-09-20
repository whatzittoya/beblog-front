import Head from "next/head";
import Style from "../styles/Home.module.css";
import Image from "next/image";
// import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import { getBlogposts } from "@/services";
import type { InferGetServerSidePropsType } from 'next'
import { gql, useQuery } from "@apollo/client";
import createApolloClient from "../../apollo-client";


export async function getStaticProps() {

  // making request to hygraph for posts
  const blogposts = await getBlogposts()
  return { props: { blogposts } };

  // const client = createApolloClient();
  // const { data } = useQuery(
  //   gql`
  //     query getBlogposts {
  //     blogposts {
  //       title
  //       slug
  //       coverImage {
  //         url
  //       }
  //       excerpt
  //       id
  //       author {
  //         name
  //       }
  //     }
  //   }
  //   `,
  // );

  // return {
  //   props: {
  //     blogposts: data.blogposts,
  //   },
  // };
}

function Homepage({ blogposts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Beblog</title>
      </Head>
      <main className={Style.postcontainer}>
        {/* using array.map() method to iterate each post returned from hygraph */}
        {blogposts?.map((blogposts) => {

          return (
            <div key={blogposts.id}>
              <div className={Style.inside}>
                <div className={Style.img}>
                  <Image
                    src={blogposts.coverImage?.url || ""}
                    alt="featured text"
                    fill
                  />
                </div>
                <div className={Style.container}>
                  <Link href={blogposts.slug}>
                    <h2>{blogposts.title}</h2>
                  </Link>
                  <p>{blogposts.excerpt}</p>
                  <p>By {blogposts.author?.name}</p>
                  <Link href={blogposts.slug}>
                    <button className={Style.readButton}>Read More</button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </main>


    </>
  );
}

export default Homepage;
