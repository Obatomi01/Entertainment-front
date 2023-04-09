import { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import './index.css';

import Home from './pages/home';
import MoviesPage from './pages/moviesPage';
import Bookmark from './pages/bookmarks';
import TvSeries from './pages/tvSeries';
import SignUp from './pages/signUp';
import Login from './pages/logIn';
import ForgotPassword from './pages/forgotPassword';

import NotFound from './components/util/notFound';
import ResetPassword from './pages/resetPassword';
import SummaryDetail from './components/home/summaryId';
// import ProtectedRoute from './components/util/protectedRoute';

let isLoggedIn;
function App() {
  isLoggedIn = localStorage.getItem('isLoggedIn');
  const [isAuth, setIsAuth] = useState(isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    loadMovies(token);
  }, []);

  const loadMovies = async (token) => {
    if (!token) return;
    try {
      const res = await fetch(`https://entertainment-app.onrender.com/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setIsAuth(data.isAuth);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeUserStatus = (status) => {
    setIsAuth(status);
  };

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route
            exact
            path='/signup'
            element={<SignUp onChangeUserStatus={onChangeUserStatus} />}
          />
          <Route
            exact
            path='/login'
            element={<Login onChangeUserStatus={onChangeUserStatus} />}
          />
          <Route
            exact
            path='/'
            element={isAuth ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            exact
            path='/movies'
            element={isAuth ? <MoviesPage /> : <Navigate to='/login' />}
          />
          <Route
            exact
            path='/tv-series'
            element={isAuth ? <TvSeries /> : <Navigate to='/login' />}
          />
          <Route
            exact
            path='/bookmark'
            element={isAuth ? <Bookmark /> : <Navigate to='/login' />}
          />
          <Route path='/request-reset-password' element={<ForgotPassword />} />

          <Route path='/reset-password' element={<ResetPassword />} />

          <Route path='/movies/:summaryId' element={<SummaryDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
