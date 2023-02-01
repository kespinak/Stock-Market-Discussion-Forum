//! 32:30
//! img line
//! both lines: 15 & 25

import styles from '../styles/BlogCard.module.css'
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

function BlogPost({title, author, coverPhoto, datePublished, slug}) {
  return (
    <div className={styles.card} >
      <Link href={`/posts/${slug}`} > 
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt='' height={200} width={550} /> 
          {/* <img src={coverPhoto ? coverPhoto.url : null} alt='' height={200} width={200} />  */}
          {/* https://stackoverflow.com/questions/74978690/img-tag-not-displaying-image-in-react-from-api-url */}
          {/* NEED TO GET THE PHOTO TO RENDER */}
          {/* <Image layout="fill" src={coverPhoto.url} alt='' /> */}
        </div>
      </Link>

      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details} >
          <div className={styles.author} >
            {/* <img src={author.avatar.url} alt={author.name} /> */}
            {/* <img src={author.avatar.url} alt='' /> */}
            {/* <img src={author? author.avatar.url : null} alt='' height={50} width={50} /> */}
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{moment(datePublished).format("MMMM d, YYYY")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;