import { Fragment } from 'react';
import Movies from '../movies/movies';

import styles from '../../styles/home/home.module.css';

import { ReactComponent as Spinner } from '../../assets/loading-spinner.svg';

/**
 *
 * @returns {JSX}
 * @param {*} props title, contentArray
 *
 */
function PageContent(props) {
  return (
    <Fragment>
      <h1>{props.title}</h1>
      {props.contentArray.length > 0 ? (
        <ul className={styles['all--movies__container']}>
          {props.contentArray.map((movie) => (
            <Movies
              key={movie._id}
              title={movie.title}
              image={movie.thumbnail.regular.large.replace('./assets', '')}
              year={movie.year}
              isBookmarked={movie.isBookmarked}
              category={movie.category}
              rating={movie.rating}
              id={movie._id}
              onBookmark={props.onBookmark}
              dataArrangement='not--trending__contents'
            />
          ))}
        </ul>
      ) : (
        <Spinner className='spinner' />
      )}
    </Fragment>
  );
}

export default PageContent;
