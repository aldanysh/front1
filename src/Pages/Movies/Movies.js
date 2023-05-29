import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import axios from "axios";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  const [genres, setGenres] = useState({});
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=1d3af739d4e5029a33c590cc5610b0e7`
    );
    setContent(data.results);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=1d3af739d4e5029a33c590cc5610b0e7`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
    // eslint-disable-next-line
  }, [genreforURL]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Movies;
