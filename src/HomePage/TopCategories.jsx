import { Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const TopCategories = () => {
  const { popularAnimeMovie } = useApi();
  return (
    <>
    <div className="md:w-[1440px] w-[1380px] mx-auto">
            <h1 className="md:text-4xl text-5xl text-secondary mt-6">Top Movies</h1>
            <div className="mt-6 md:block hidden">
            <Splide options={{perPage: 5, gap:"0.5rem" , drag:'free' , arrows:false}}>
                {popularAnimeMovie.slice(0,15).map((anime) => {
                return (
                    <SplideSlide key={anime.mal_id}>
                    <div className="w-[280px] h-[400px]">
                            <Link
                            to={`/anime/${anime.mal_id}`}
                            key={anime.mal_id}
                            className=""
                            >
                                <img
                                    src={anime.images.jpg.large_image_url}
                                    alt=""
                                    className="w-full h-full object-cover rounded-3xl relative"
                                />
                                <div className="absolute bottom-0 bg-secondary w-[280px] top-80 opacity-75 text-center rounded-b-3xl">
                                    <h1 className="text-lg text-[#ffffff] text-wrap pt-3 text-bold">{anime.title}</h1>
                                </div>
                                
                            </Link>
                    </div>
                    </SplideSlide>
                );
                })}
            </Splide>
            </div>
            <div className="mt-6 md:hidden flex-none">
            <Splide options={{perPage: 3, gap:"0.5rem" , drag:'free' , arrows:false}}>
                {popularAnimeMovie.slice(0,15).map((anime) => {
                return (
                    <SplideSlide key={anime.mal_id}>
                    <div className="w-[425px] h-[600px]">
                            <Link
                            to={`/anime/${anime.mal_id}`}
                            key={anime.mal_id}
                            className=""
                            >
                                <img
                                    src={anime.images.jpg.large_image_url}
                                    alt=""
                                    className="w-full h-full object-cover rounded-3xl relative"
                                />
                                <div className="absolute bottom-0 bg-secondary w-[425px] top-[30rem] opacity-75 text-center rounded-b-3xl">
                                    <h1 className="text-3xl text-[#ffffff] text-wrap pt-6 text-bold">{anime.title}</h1>
                                </div>
                                
                            </Link>
                    </div>
                    </SplideSlide>
                );
                })}
            </Splide>
            </div>
    </div>
    
    </>
  );
};
export default TopCategories;
