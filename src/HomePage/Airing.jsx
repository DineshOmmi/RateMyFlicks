import { Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";

const Airing = ({render}) => {
  const {airingAnime, isSearch , searchResults} = useApi();
  const conditionalRender = () => {
    if (!isSearch && render === 'airing') {
      return airingAnime.slice(0,24).map((anime) => {
        return(
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="md:h-[400px] h-[600px] md:w-auto w-[425px] md:rounded-lg rounded-3xl border-[5px] border-solid border-[#e5e7eb]">
              <img src={anime.images.jpg.large_image_url} alt="" className="w-full h-full object-cover md:rounded-md rounded-xl"/>
            </Link>
        )
      });
    }
    else{
      return searchResults.map((anime) => {
        return(
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="md:h-[400px] h-[600px] md:w-auto w-[425px] md:rounded-lg rounded-3xl border-[5px] border-solid border-[#e5e7eb]">
              <img src={anime.images.jpg.large_image_url} alt="" className="w-full h-full object-cover md:rounded-md rounded-xl"/>
            </Link>
        )
      });
    }
    
  };
  return (
    <div className="pt-3 pl-8 pb-8 pr-7 w-full h-full">
      <div className="grid md:grid-cols-5 grid-cols-3 md:gap-5 gap-8 ">{conditionalRender()}</div>
    </div>
  );
};
export default Airing;
