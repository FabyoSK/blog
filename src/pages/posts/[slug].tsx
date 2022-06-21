import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { PrismicRichText } from '@prismicio/react';
import { createClient } from '../../../prismicio';
import styles from './post.module.scss';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Seo from '../../components/SEO';

export default function Post({ post }) {
  return (
    <>
      <Seo
        title={`${post.title} | FabyoSK Blog`}
        description={post.excerpt}
        slug={post.slug}
      />
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div className={styles.postContent}>
            <PrismicRichText
              field={post.content}
              components={{
                preformatted: ({ node }) => <SyntaxHighlighter language="javascript" style={oneDark}>
                  {node.text}
                </SyntaxHighlighter>
              }}
            />
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient();

  const response = await client.getAllByType('post');

  return {
    paths: [
      ...response.map((post) => ({
        params: {
          slug: post.uid,
        },
      })),
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = createClient();
  const { slug } = params;

  const response = await client.getByUID('post', String(slug));

  const post = {
    slug,
    title: response.data.title,
    content: response.data.content,
    excerpt: response.data.excerpt,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'en',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 6, // 6 hours
  };
};
