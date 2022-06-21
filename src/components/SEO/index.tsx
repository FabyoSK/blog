import React from 'react';
import Head from 'next/head';

const SEO = ({
  title,
  description,
  slug,
  // coverImage,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://blog.fabyosk.com/posts/${slug}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={coverImage} /> */}

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://blog.fabyosk.com/posts/${slug}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {/* <meta property="twitter:image" content={coverImage} /> */}
    </Head>
  );
};

export default SEO;