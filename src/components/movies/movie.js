import styles from '../../styles/movie/movie.module.css';

function Movie(props) {
  return (
    <div>
      <h3>{props.year}</h3>
      <h3>{props.category}</h3>
      <h3>{props.rating}</h3>
    </div>
  );
}

export default Movie;
