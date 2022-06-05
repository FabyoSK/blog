import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";
import styles from './post.module.scss';

export default function Post({
  post
}) {
  return (
    <>
      <Head>
        <title>Blog | FabyoSK Blog</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={styles.postContent}
          >
            <PrismicRichText field={post.content} />
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient()

  const response = await client.getAllByType('post')

  return {
    paths: [
      ...response.map(post => ({
        params: {
          slug: post.uid,
        },
      })),
    ],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) =>  {
  const client = createClient()
  const { slug } = params;

  const response = await client.getByUID('post', String(slug))

  const post = {
    slug,
    title: response.data.title,
    content: response.data.content,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 6, // 6 hours
  }
}