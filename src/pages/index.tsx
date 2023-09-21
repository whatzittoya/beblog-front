import Head from "next/head";
import Style from "../styles/Home.module.css";
import Image from "next/image";
// import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import { getBlogposts } from "@/services/server-side";
import { GetBlogpostsClient } from "@/services/client-side";
import type { InferGetServerSidePropsType } from 'next'
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const data = await getBlogposts()
  const blogposts = data?.blogposts

  return { props: { blogposts } };

}


function Homepage({ blogposts }: InferGetServerSidePropsType<typeof getStaticProps>) {


  // const q = use(getData())

  // const { data, loading } = getBlogpostsClient()

  // if (loading) return 'Loading...';

  // const blogposts = data?.blogposts
  return (
    <>
      <Head>
        <title>Beblog</title>
      </Head>

      <div className='py-2 bg-slate-900 flex flex-col'>
        {/* using array.map() method to iterate each post returned from hygraph */}
        {blogposts?.map((blogposts) => {

          return (
            <Link href={blogposts.slug} passHref key={blogposts.id}>
              <div className='py-2 flex flex-col-reverse sm:flex-row align-middle gap-2 justify-center hover:bg-slate-800 p-5'>

                <div className={Style.container}>
                  <h2 className="text-lg font-bold">{blogposts.title}</h2>
                  <p className="text-gray-400">{blogposts.excerpt}</p>
                  <p className="text-gray-400">By {blogposts.author?.name}</p>

                </div>
                <div className={Style.img}>
                  <Image
                    src={blogposts.coverImage?.url || ""}
                    alt="featured text"
                    fill
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>


    </>
  );
}

export default Homepage;
