//error[slug]
//.vscode/settings.json

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { GraphQLClient, gql } from 'graphql-request';
import BlogCard from '../components/BlogCard';

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cldkknz9l08jv01udb1jt4d71/master');

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);
  return{
    props: {
      posts
    },
    revalidate: 30,
  };
};

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Stock Market Discussion Forum</title>
        <meta name="Stock Market Discussion Forum" content="Stock Market Discussion Forum" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Stock Market Discussion Forum</h1>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard 
            title={post.title} 
            author={post.author} 
            coverPhoto={post.coverPhoto} 
            key={post.id} 
            datePublished={post.datePublished} 
            slug={post.slug} 
          />
        ))}
      </main>
    </>
  )
}
