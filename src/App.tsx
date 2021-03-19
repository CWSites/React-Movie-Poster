import { FormEvent, useState } from "react";
import "./App.scss";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const App = () => {
  const [searchText, updateSearchText] = useState("");
  const [movies, updateMovies] = useState<Array<Movie>>([]);
  const [message, updateMessage] = useState("");

  const handleSearchChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    updateSearchText(value);
  };

  const movieSearch = (event: FormEvent, lucky: boolean) => {
    event.preventDefault();
    updateMovies([]);
    updateMessage("Loading Results...");

    fetch(
      `https://www.omdbapi.com/?s=%7B${searchText}%7D&type=movie&apikey=902755be`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!!data.Response) {
          if (data.Search) {
            updateMessage("");
            updateMovies(lucky ? [data.Search[0]] : data.Search);
          } else {
            updateMovies([]);
            updateMessage("No results");
          }
        } else {
          updateMovies([]);
          console.error("error returning results", data);
        }
      });
  };

  return (
    <div className="app">
      <h1>React Movie Posters</h1>
      <form className="search-form">
        <input
          onChange={handleSearchChange}
          placeholder="Enter movie title"
          type="search"
          value={searchText}
        />
        <button type="submit" onClick={(event) => movieSearch(event, false)}>
          Movie Search
        </button>
        <button type="submit" onClick={(event) => movieSearch(event, true)}>
          I'm Feeling Lucky
        </button>
      </form>
      {message && <h3>{message}</h3>}
      {movies.length > 0 && <Results movies={movies} />}
    </div>
  );
};

interface ResultsProps {
  movies: Array<Movie>;
}

const Results = ({ movies }: ResultsProps) => {
  const [poster, updatePoster] = useState("");

  const selectMovie = (event: FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    updatePoster(value);
  };

  return (
    <section className="results">
      {movies.length > 1 ? (
        <>
          <label>
            <strong className="num">{movies.length}</strong> Movie result(s):
            <select onChange={selectMovie}>
              {movies.map((movie, index) => (
                <option key={index} value={movie.Poster}>
                  {movie.Title}
                </option>
              ))}
            </select>
          </label>
          {poster && <img src={poster} alt="movie poster" />}
        </>
      ) : (
        <>
          <h2>Today's your lucky day...</h2>
          <img src={movies[0].Poster} alt={movies[0].Title} />
        </>
      )}
    </section>
  );
};

export default App;
