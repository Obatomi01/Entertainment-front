import { useRef, useState, forwardRef, useImperativeHandle } from 'react';

import { ReactComponent as SearchIcon } from '../../assets/icon-search.svg';
import { ReactComponent as FilterIcon } from '../../assets/filter-list.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';

import styles from '../../styles/search/search.module.css';
import FilterOptions from './filterOptions';

/**
 * @param {function} props onSearch, onHandleFilterResult, onShowAllFilter
 * @returns {JSX} form for the user to input a search item
 * @parent {Home}
 */

function Search(props, ref) {
  const [inputValue, setInputValue] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const inputRef = useRef(null);

  const onChangeInputHandler = (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    setInputValue(query);
    props.onSearch(query);
  };

  useImperativeHandle(ref, () => ({
    onShowFilterOptions: () => {
      setShowFilterOptions(false);
    },
  }));

  const onShowFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  return (
    <form
      className={`${styles.form} ${
        props.showFilter ? '' : `${styles['without--filter']}`
      }`}
      onSubmit={onChangeInputHandler}
    >
      <div className={styles['search--container']}>
        <SearchIcon
          className={styles['search--icon']}
          onClick={onChangeInputHandler}
        />
        <input
          name='search'
          type='text'
          onInput={onChangeInputHandler}
          ref={inputRef}
          value={inputValue}
          placeholder={props.searchPlaceholder}
        />
      </div>
      {props.showFilter ? (
        <div>
          {showFilterOptions ? (
            <FilterOptions onShowAllFilter={props.onShowAllFilter} />
          ) : (
            ''
          )}
          {!showFilterOptions ? (
            <FilterIcon
              className={styles['filter--icon']}
              onClick={onShowFilterOptions}
            />
          ) : (
            <CloseIcon
              className={styles['filter--icon']}
              onClick={onShowFilterOptions}
            />
          )}
        </div>
      ) : (
        ''
      )}
    </form>
  );
}

export default forwardRef(Search);
