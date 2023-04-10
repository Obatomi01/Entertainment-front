// bookmark page
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../components/navigation/navigation';

import styles from '../styles/home/home.module.css';
import PageContent from '../components/home/pageContents';
import { ReactComponent as Spinner } from '../assets/loading-spinner.svg';

/**
 *
 * @returns
 * @parent {App}
 */
function Bookmark() {
  const navigate = useNavigate();

  const [bookmarked, setBookmarked] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    loadBookmarkedMovies();
  }, []);

  const loadBookmarkedMovies = async () => {
    setShowSpinner(true);
    try {
      const res = await fetch(
        'https://entertainment-app.onrender.com/movies/bookmarks'
      );
      const data = await res.json();
      setShowSpinner(false);
      setBookmarked(data.data);
    } catch (err) {
      console.log(err);
      navigate('login');
    }
  };

  const bookmarkedTvSeries = bookmarked.filter(
    (movie) => movie.category === 'TV Series'
  );

  const bookmarkedMovies = bookmarked.filter(
    (movie) => movie.category === 'Movie'
  );

  const changeIsBookmark = () => {
    loadBookmarkedMovies();
  };

  return (
    <section className='app--container'>
      <Navigation page='/bookmark' />

      {showSpinner ? (
        <Spinner className='spinner' />
      ) : (
        <div className={styles['movies--container']}>
          <PageContent
            title='Bookmarked TV Series'
            contentArray={bookmarkedTvSeries}
            onBookmark={changeIsBookmark}
            onShowSpinner={showSpinner}
          />
          <PageContent
            title='Bookmarked Movies'
            contentArray={bookmarkedMovies}
            onBookmark={changeIsBookmark}
            onShowSpinner={showSpinner}
          />
        </div>
      )}
    </section>
  );
}

export default Bookmark;
