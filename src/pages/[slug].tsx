import { GraphQLClient, gql } from "graphql-request";
import Head from "next/head";
import Style from "../styles/SinglePost.module.css";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import { getBlogpost, getSlugs } from "@/services/server-side";
import type { InferGetServerSidePropsType, GetStaticProps } from 'next'
import { convertToObject } from "typescript";


export async function getStaticPaths() {

  // querying for slugs from hygraph...
  const data = await getSlugs()
  const blogposts = data.blogposts
  return {
    paths: blogposts.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // making request to hygraph for each post matching a slug

  const data = await getBlogpost(params?.slug)
  const blogpost = data?.blogpost
  const content = blogpost?.content?.markdown

  //serializing my markdown response from the rich text field

  const MdxSource = content ? await serialize(content) : null
  return { props: { post: blogpost || [], source: MdxSource }, revalidate: 10 };



}

function SinglePost({ post, source }: InferGetServerSidePropsType<typeof getStaticProps>) {
  if (!post || !source) {
    return ""
  }
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <main className={Style.main}>
        <div className={Style.header}>
          <h1>{post?.title}</h1>
          <h3>Author: {post?.author?.name}</h3>
        </div>
        <div className={Style.img}>
          <Image src={post?.coverImage?.url || ""} alt={post?.coverImage?.altText || ""} fill />
        </div>

        <div className={Style.mdxs}>

          <MDXRemote {...source} />
        </div>
      </main>
    </>
  );
}

export default SinglePost;
