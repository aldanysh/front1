import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";


const Series = () => {
  const [genres, setGenres] = useState([]);
  const [content, setContent] = useState([]);


  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=1d3af739d4e5029a33c590cc5610b0e7`
    );
    setContent(data.results);
   
    // console.log(data);
  };

  useEffect(() => {
   
    fetchSeries();
    // eslint-disable-next-line
  }, []); 

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      
    </div>
  );
};


export default Series;
