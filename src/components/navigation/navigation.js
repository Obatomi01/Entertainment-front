import { NavLink, useNavigate } from 'react-router-dom';

import styles from '../../styles/home/home.module.css';
import '../../index.css';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as NavHome } from '../../assets/icon-nav-home.svg';
import { ReactComponent as NavMovies } from '../../assets/icon-nav-movies.svg';
import { ReactComponent as NavSeries } from '../../assets/icon-nav-tv-series.svg';
import { ReactComponent as Bookmark } from '../../assets/icon-nav-bookmark.svg';
import { ReactComponent as LogOut } from '../../assets/logout.svg';

function Navigation(props) {
  const navigate = useNavigate();

  const onLogOutHandler = () => {
    const limit = {
      limitHomePage: 9,
      limitMoviesPage: 4,
      limitTVSeries: 4,
    };

    localStorage.removeItem('jwt');
    localStorage.removeItem('isLoggedIn');
    localStorage.setItem('pageLimit', JSON.stringify(limit));
    navigate('/login');
  };

  return (
    <nav className='nav--container'>
      <a>
        <Logo />
      </a>
      <ul className='nav--routes__container'>
        <li>
          <NavLink
            exact='true'
            to='/'
            className={`${props.page === '/' ? styles.active : ''} ${
              styles['nav--icon']
            }`}
          >
            <NavHome />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/movies'
            className={`${props.page === '/movies' ? styles.active : ''} ${
              styles['nav--icon']
            }`}
          >
            <NavMovies />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/tv-series'
            className={`${props.page === '/tv-series' ? styles.active : ''} ${
              styles['nav--icon']
            }`}
          >
            <NavSeries />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/bookmark'
            className={`${props.page === '/bookmark' ? styles.active : ''} ${
              styles['nav--icon']
            }`}
          >
            <Bookmark />
          </NavLink>
        </li>
      </ul>

      <button onClick={onLogOutHandler}>
        <LogOut className={styles['nav--icon']} />
      </button>
    </nav>
  );
}

export default Navigation;
