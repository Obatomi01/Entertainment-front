import { useState, useEffect, useContext } from 'react';
import Navigation from '../components/navigation/navigation';

import styles from '../styles/home/home.module.css';

import PageContent from '../components/home/pageContents';
import Search from '../components/search/search';

import { loadMovies } from '../components/util/util';

let limit;
/**
 *
 * @param {*} props allMovies
 * @returns {JSX}
 * @parent {App}
 */
function MoviesPage() {
  const [moviesCategory, setMoviesCategory] = useState([]);
  const [showMoreButton, setMoreButton] = useState(true);
  const [fetchedMovies, setFetchedMovies] = useState([]);

  const [showSpinner, setShowSpinner] = useState(true);

  const token = localStorage.getItem('jwt');
  limit = JSON.parse(localStorage.getItem('pageLimit'));

  useEffect(() => {
    const getResult = async () => {
      const result = await loadMovies(
        setMoviesCategory,
        'movieCategory',
        limit.limitMoviesPage,
        token,
        'Movie'
      );
      setShowSpinner(false);
      setFetchedMovies(result.data.movieCategory);
      setMoreButton(result.showMore);
    };
    getResult();
  }, []);

  const showMoreMovies = async () => {
    limit.limitMoviesPage += 4;
    localStorage.setItem('pageLimit', JSON.stringify(limit));
    const result = await loadMovies(
      setMoviesCategory,
      'movieCategory',
      limit.limitMoviesPage,
      token,
      'Movie'
    );
    setFetchedMovies(result.data.movieCategory);
    setMoreButton(result.showMore);
  };

  const onChangeSearchResults = (input) => {
    const inputLength = input.length;
    const searchMovies = fetchedMovies.filter((movie) => {
      const searchArray = movie.title.toLowerCase().split(' ');

      let compareLetter;
      for (let letter of searchArray) {
        compareLetter = letter.slice(0, inputLength);
        if (compareLetter === input) return true;
      }
    });
    setMoviesCategory(searchMovies);
  };

  return (
    <section className='app--container'>
      <Navigation page='/movies' />
      <div className={styles['movies--container']}>
        <Search
          onSearch={onChangeSearchResults}
          showFilter={false}
          searchPlaceholder='Search for Movies'
        />
        <PageContent
          title='Movies'
          contentArray={moviesCategory}
          onBookmark={loadMovies.bind(
            null,
            setMoviesCategory,
            'movieCategory',
            limit.limitMoviesPage,
            token,
            'Movie'
          )}
          onShowSpinner={showSpinner}
          onShowMoreButton={showMoreButton}
          onShowMoreMovies={showMoreMovies}
        />
        {/* {showMoreButton ? (
          <button
            type='button'
            onClick={showMoreMovies}
            className={styles['more--button']}
          >
            See More
          </button>
        ) : (
          ''
        )} */}
      </div>
    </section>
  );
}

export default MoviesPage;
