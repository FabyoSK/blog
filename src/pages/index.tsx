import Head from 'next/head';
import Link from 'next/link';

import styles from './home.module.scss';

import { createClient } from '../../prismicio';

export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Posts | FabyoSK Blog</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <span>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const response = await client.getAllByType('post');

  const posts = response.map((post) => ({
    slug: post.uid,
    title: post.data.title,
    excerpt: post.data.content.find((c) => c.type === 'paragraph')?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('en', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return {
    props: { posts },
    revalidate: 60 * 60, // 1 hour
  };
}
