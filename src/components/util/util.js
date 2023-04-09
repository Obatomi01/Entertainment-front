// functions reused several times
/**
 *
 * @param {function} setFunction
 * @param {string} result
 * @param {number} limit
 * @param {string} token
 * @param {string} category
 * */
export const loadMovies = async (
  setFunction,
  result,
  limit,
  token,
  category
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/movies?limit=${limit}&category=${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setFunction(data.data[`${result}`]);

    return data;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {String} input
 * @param {Array} moviesCategory
 * @param {Function} setFunction
 */
export const onChangeSearchResults = (input, moviesCategory, setFunction) => {
  const inputLength = input.length;
  const searchMovies = moviesCategory.filter((movie) => {
    const searchArray = movie.title.toLowerCase().split(' ');

    let compareLetter;
    for (let letter of searchArray) {
      compareLetter = letter.slice(0, inputLength);
      if (compareLetter === input) return true;
    }
  });
  setFunction(searchMovies);
};
