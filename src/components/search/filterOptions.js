import { useCallback, useState } from 'react';

import styles from '../../styles/search/search.module.css';

import { useLocation, useNavigate } from 'react-router-dom';

const yearFilterOptions = [2013, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

const ratingsFilterOptions = ['E', 'PG', '18+'];

let filterYear, filterRating, url;
/**
 *
 * @param {*} props
 * @returns
 * @parent {Search}
 */
function FilterOptions(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [activeYearOption, setActiveYearOption] = useState(
    +searchParams.get('year') || 'Show All Years'
  );

  const [activeRatingOption, setActiveRatingOption] = useState(
    searchParams.get('rating') || 'Show All Ratings'
  );
  const navigate = useNavigate();

  const onSetActiveHandler = useCallback(
    (e) => {
      e.preventDefault();

      const parent = e.target.parentNode.className;

      if (parent === 'years--container') {
        filterYear = e.target.value;
      }
      if (parent === 'ratings--container') {
        filterRating = e.target.innerText;
      }

      if (filterYear && filterRating) {
        url = `/?year=${filterYear}&rating=${encodeURIComponent(filterRating)}`;
      } else if (filterYear) {
        url = `/?year=${filterYear}`;
      } else if (filterRating) {
        url = `/?rating=${encodeURIComponent(filterRating)}`;
      }

      if (activeYearOption === 'Show All Years' && !filterYear) {
        setActiveYearOption('Show All Years');
      }
      if (activeRatingOption === 'Show All Ratings' && !filterRating) {
        setActiveRatingOption('Show All Ratings');
      }

      if (filterYear) {
        setActiveYearOption(filterYear);
      }
      if (filterRating) {
        setActiveRatingOption(filterRating);
      }

      searchParams.set('year', filterYear);
      searchParams.set('rating', filterRating);
      navigate(url);
    },
    [navigate]
  );

  const showYearFilters = (year, i) => {
    return (
      <li
        value={year}
        key={i}
        className={activeYearOption === year ? `${styles.active}` : ''}
        onClick={onSetActiveHandler}
      >
        {year}
      </li>
    );
  };

  const showRatingFilters = (rating, i) => {
    return (
      <li
        value={rating}
        key={i}
        className={activeRatingOption === rating ? `${styles.active}` : ''}
        onClick={onSetActiveHandler}
      >
        {rating}
      </li>
    );
  };

  const onShowAllYearHandler = (e) => {
    setActiveYearOption('Show All Years');
    filterYear = 0;
    searchParams.delete('year');
    const queryString = searchParams.toString();
    navigate({ search: queryString });
  };

  const onShowAllRatingsHandler = (e) => {
    setActiveRatingOption('Show All Ratings');
    filterRating = '';
    searchParams.delete('rating');
    const queryString = searchParams.toString();
    navigate({ search: queryString });
  };

  return (
    <div className={styles['filter--options']}>
      <h1>Year</h1>
      <ul className='years--container'>
        {yearFilterOptions.map(showYearFilters)}
      </ul>
      <h2
        className={
          activeYearOption === 'Show All Years' ? `${styles.active}` : ''
        }
        onClick={onShowAllYearHandler}
      >
        Show All Years
      </h2>
      <h1>Rating</h1>
      <ul className='ratings--container'>
        {ratingsFilterOptions.map(showRatingFilters)}
      </ul>
      <h2
        className={
          activeRatingOption === 'Show All Ratings' ? `${styles.active}` : ''
        }
        onClick={onShowAllRatingsHandler}
      >
        Show All Ratings
      </h2>
    </div>
  );
}

export default FilterOptions;
