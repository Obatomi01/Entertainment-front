import { useEffect, useState } from 'react';

import Navigation from '../components/navigation/navigation';

import styles from '../styles/home/home.module.css';

import PageContent from '../components/home/pageContents';
import Search from '../components/search/search';

import { loadMovies, onChangeSearchResults } from '../components/util/util';
let limit;
/**
 *
 * @returns {JSX}
 * @parent {App}
 */
function TvSeries() {
  const [tvSeriesCategory, setTvSeriesCategory] = useState([]);
  const [showMoreButton, setMoreButton] = useState(true);
  const [fetchedTvSeries, setFetchedTvSeries] = useState([]);

  const [showSpinner, setShowSpinner] = useState(true);

  const token = localStorage.getItem('jwt');
  limit = JSON.parse(localStorage.getItem('pageLimit'));

  useEffect(() => {
    const getResult = async () => {
      const result = await loadMovies(
        setTvSeriesCategory,
        'tvSeriesCategory',
        limit.limitTVSeries,
        token,
        'TV Series'
      );
      setShowSpinner(false);
      setFetchedTvSeries(result.data.tvSeriesCategory);
      setMoreButton(result.showMore);
    };

    getResult();
  }, []);

  const onChangeSearchResultsHandler = (input) => {
    onChangeSearchResults(input, fetchedTvSeries, setTvSeriesCategory);
  };

  const showMoreMovies = async () => {
    limit.limitTVSeries += 4;
    localStorage.setItem('pageLimit', JSON.stringify(limit));
    const result = await loadMovies(
      setTvSeriesCategory,
      'tvSeriesCategory',
      limit.limitTVSeries,
      token,
      'TV Series'
    );
    setFetchedTvSeries(result.data.tvSeriesCategory);
    setMoreButton(result.showMore);
  };

  return (
    <section className='app--container'>
      <Navigation page='/tv-series' />
      <div className={styles['movies--container']}>
        <Search
          onSearch={onChangeSearchResultsHandler}
          showFilter={false}
          searchPlaceholder='Search for TV series'
        />
        <PageContent
          title='TV Series'
          contentArray={tvSeriesCategory}
          onBookmark={loadMovies.bind(
            null,
            setTvSeriesCategory,
            'tvSeriesCategory',
            limit.limitTVSeries,
            token,
            'TV Series'
          )}
          onShowSpinner={showSpinner}
        />
        {showMoreButton ? (
          <button
            type='button'
            onClick={showMoreMovies}
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

export default TvSeries;
