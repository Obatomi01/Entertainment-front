import { useNavigate } from 'react-router-dom';

import styles from '../../styles/movie/movie.module.css';

import { ReactComponent as EmptyBookmarkIcon } from '../../assets/icon-bookmark-empty.svg';
import { ReactComponent as FullBookmarkIcon } from '../../assets/icon-bookmark-full.svg';

/**
 *
 * @param {any} props title, isBookmarked, image, year, category, rating, dataArrangement
 * @returns {JSX}
 * @parent {Trending, Bookmark, Home}
 */
const Movies = (props) => {
  const navigate = useNavigate();

  const onBookmarkHandler = async (e) => {
    const selectedImageElement = e.target;
    const selectedObjectId = selectedImageElement.getAttribute('data-id');
    const selectedObjectBookmark =
      selectedImageElement.getAttribute('data-bookmark');

    const movieData = {
      id: selectedObjectId,
      bookmarkState: selectedObjectBookmark === 'true' ? false : true,
    };

    if (selectedObjectId) {
      const response = await fetch(
        'https://entertainment-app.onrender.com/movies/bookmark',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData),
        }
      );

      const data = await response.json();
      if (data) {
        props.onBookmark();
      }
    }
  };

  const onShowSummaryHandler = (e) => {
    const selectedImageElement = e.target;
    const selectedObjectId = selectedImageElement.getAttribute('data-id');

    navigate(`/movies/${selectedObjectId}`);
  };

  return (
    <li
      className={`${styles['movie--contents']} ${
        styles[props.dataArrangement]
      }`}
    >
      <img
        src={props.image}
        alt={props.title}
        onClick={onShowSummaryHandler}
        data-id={props.id}
      />
      <div className={styles['show--summary__container']}>
        <h2>show summary</h2>
      </div>
      <button
        className={styles['bookmark--icons']}
        onClick={onBookmarkHandler}
        data-id={props.id}
        data-bookmark={props.isBookmarked}
      >
        {!props.isBookmarked ? (
          <EmptyBookmarkIcon
            onClick={onBookmarkHandler}
            data-id={props.id}
            data-bookmark={props.isBookmarked}
          />
        ) : (
          <FullBookmarkIcon
            onClick={onBookmarkHandler}
            data-id={props.id}
            data-bookmark={props.isBookmarked}
          />
        )}
      </button>

      <div className={`${styles['movie--content']} `}>
        <div>
          <h3>{props.year}</h3>
          <h3>{props.category}</h3>
          <h3>{props.rating}</h3>
        </div>
        <h2>{props.title}</h2>
      </div>
    </li>
  );
};

export default Movies;
