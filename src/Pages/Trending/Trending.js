import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css"
const Trending = () => {
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=1d3af739d4e5029a33c590cc5610b0e7`
    );
    //console.log(data.results);

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {content && content.map((c) => 
        <SingleContent 
        key={c.id}
        id={c.id}
        poster={c.poster_path}
        title={c.title || c.name}
        date={c.first_air_date || c.release_date}
        media_type={c.media_type}
        vote_average={c.vote_average}/>)}
          
      </div>
    
    </div>
  );
};

export default Trending;