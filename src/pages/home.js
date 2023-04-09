import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MyContext } from '../components/util/ctx';

import Movies from '../components/movies/movies';
import Trending from '../components/home/trending';
import Navigation from '../components/navigation/navigation';
import styles from '../styles/home/home.module.css';

import Search from '../components/search/search';

import { ReactComponent as Spinner } from '../assets/loading-spinner.svg';

let filterResult;
let moviesResult;
let limit;
/**
 *
 * @returns {JSX}
 * @parent {App}
 */
function Home() {
  const searchRef = useRef(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  const ctx = useContext(MyContext);
  ctx.token = localStorage.getItem('jwt');
  ctx.userName = localStorage.getItem('loggedInUser');

  ctx.curFilterYear = searchParams.get('year');
  ctx.curFilterRating = searchParams.get('rating');

  const { token } = ctx;
  const { userName } = ctx;

  limit = JSON.parse(localStorage.getItem('pageLimit'));

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    loadMovies();
  }, [location]);

  const loadMovies = async () => {
    const year = searchParams.get('year');
    const rating = searchParams.get('rating');

    localStorage.setItem('pageLimit', JSON.stringify(limit));
    const url =
      year || rating
        ? `https://entertainment-app.onrender.com/movies?year=${year}&rating=${encodeURIComponent(
            rating
          )}&limit=${limit.limitHomePage}`
        : `https://entertainment-app.onrender.com/movies?limit=${limit.limitHomePage}`;

    console.log(url);
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setShowMoreButton(data.showMore);
      moviesResult = data.data.otherMovies;

      setShowSpinner(false);
      setSearchResults(data.data.otherMovies);
      setTrendingMovies(data.data.trendingMovies);
    } catch (err) {
      console.log(err);
    }
  };

  const showMoreMovies = () => {
    limit.limitHomePage += 4;

    loadMovies();
  };

  const onShowAllFilterHandler = () => {
    navigate({ search: '' });
    setSearchResults(searchResults);
  };

  /**
   * @param {any} parameter letters entered by the user
   *  @return {searchResults}
  
   */
  const onChangeSearchResults = (input) => {
    const searchParams = new URLSearchParams(location.search);

    const year = searchParams.get('year');

    const possibleOptions = year === null ? moviesResult : searchResults;

    const inputLength = input.length;
    const searchMovies = possibleOptions.filter((movie) => {
      const searchArray = movie.title.toLowerCase().split(' ');

      let compareLetter;
      for (let letter of searchArray) {
        compareLetter = letter.slice(0, inputLength);
        if (compareLetter === input) return true;
      }
    });
    setSearchResults(searchMovies);
  };

  const onShowMoreMoviesHandler = () => {
    navigate({ search: '' });
    searchRef.current.onShowFilterOptions();
    showMoreMovies();
  };

  return (
    <section className='app--container'>
      <Navigation page='/' />
      <div className={styles['movies--container']}>
        <h1 className='no--margin__texts'>Welcome {userName}</h1>
        <Search
          onSearch={onChangeSearchResults}
          onShowAllFilter={onShowAllFilterHandler}
          showFilter={true}
          searchPlaceholder='Search for movies or TV series'
          ref={searchRef}
        />
        <Trending moviesCategory={trendingMovies} onBookmark={loadMovies} />
        <h1>Recommended for you</h1>
        {showSpinner ? (
          <Spinner className='spinner' />
        ) : searchResults.length > 0 ? (
          <ul className={styles['all--movies__container']}>
            {searchResults.map((movie, i) => (
              <Movies
                key={i}
                title={movie.title}
                image={movie.thumbnail.regular.large.replace('./assets', '')}
                isBookmarked={movie.isBookmarked}
                year={movie.year}
                category={movie.category}
                onBookmark={loadMovies}
                id={movie._id}
                dataArrangement='not--trending__contents'
                rating={movie.rating}
              />
            ))}
          </ul>
        ) : (
          <div>No item Found</div>
        )}
        {showMoreButton ? (
          <button
            type='button'
            onClick={onShowMoreMoviesHandler}
            className={styles['more--button']}
          >
            See More
          </button>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}

export default Home;
