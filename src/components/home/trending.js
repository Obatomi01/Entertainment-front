// SLICK SLIDER PACKAGE
import React, { useState, useEffect, useRef } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Movies from '../movies/movies';
import styles from '../../styles/movie/movie.module.css';
import '../../index.css';

/**
 *
 * @param {any} props moviesCategory, onBookmark
 * @returns {Movie}
 * @parent Home
 */
function Trending(props) {
  const [slidesToShow, setSlidesToShow] = useState(getInitialSlidesToShow());

  const sliderRef = useRef(null);

  function getInitialSlidesToShow() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 992) {
      return 2;
    } else {
      return 3;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 992) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    dotsClass: 'my-dots',
    arrows: false,
  };

  const newMoviesArray = props.moviesCategory.map((movie) => {
    const { large } = movie.thumbnail.trending;
    return { ...movie, large: large.replace('./assets', '') };
  });

  return (
    <section className={styles['slide--container']}>
      <h1>Trending</h1>
      <Slider {...settings} className='slick-track' ref={sliderRef}>
        {newMoviesArray.map((movie) => (
          <Movies
            key={movie._id}
            title={movie.title}
            image={movie.large}
            year={movie.year}
            isBookmarked={movie.isBookmarked}
            category={movie.category}
            rating={movie.rating}
            id={movie._id}
            onBookmark={props.onBookmark}
            dataArrangement='trending--movie__content'
          />
        ))}
      </Slider>
    </section>
  );
}

export default Trending;
