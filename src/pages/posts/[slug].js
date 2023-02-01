import styles from '../../styles/Slug.module.css';
import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cldkknz9l08jv01udb1jt4d71/master');

const QUERY = gql`
  query Post($slug: String!) {
    post(where: {slug: $slug}) {
      id
      title
      slug
      datePublished
      author {
        id 
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);

  return {
    paths: posts.map((post) => ({ params: {slug: post.slug }})),
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;

  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <img 
        className={styles.cover} 
        src={post.coverPhoto.url} 
        alt='' 
      />
    
      <div className={styles.title} >
        <img src={post.author.avatar.url} alt='' height={300} width={300} />
        <div className={styles.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}> {post.datePublished} </h6>
        </div>
        <h2>{post.title}</h2>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content.html}} >
        </div>
      </div>
    </main>
  );
}