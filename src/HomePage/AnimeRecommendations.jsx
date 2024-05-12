import { Link } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Genres from "./Genres";

const AnimeRecommendations = () => {
  const {animeRecommendations} = useApi();
  return (
    <>
      <div className="md:w-[1440px] w-[1380px] mx-auto flex md:flex-row flex-col-reverse justify-between mt-10">
           <div className="md:w-[1000px] md:mt-0 mt-10">
                <h1 className="md:text-4xl text-5xl text-secondary mt-6">Recommendations</h1>
                {/* for laptop */}
                <div className="mt-6 md:block hidden">
                <Splide
                    options={{ perPage: 4, gap: "0.5rem", drag: "free", arrows: false }}
                >
                    {animeRecommendations.slice(5, 25).map((anime) => {
                    return (
                        <SplideSlide key={anime.mal_id}>
                        <div className="w-[230px] h-[300px]">
                            <Link
                            to={`/anime/${anime.entry[0].mal_id}`}
                            key={anime.entry[0].mal_id}
                            className=""
                            >
                            <img
                                src={anime.entry[0].images.jpg.large_image_url}
                                alt=""
                                className="w-full h-full object-cover rounded-3xl relative"
                            />
                            <div className="absolute bottom-0 bg-secondary w-[230px] top-55 opacity-75 text-center rounded-b-3xl">
                                <h1 className="text-lg text-[#ffffff] text-wrap pt-3 text-bold">
                                {anime.entry[0].title}
                                </h1>
                            </div>
                            </Link>
                        </div>
                        </SplideSlide>
                    );
                    })}
                </Splide>
                </div>
                {/* for mobile */}
                <div className="mt-6 md:hidden block">
                <Splide
                    options={{ perPage: 3, gap: "0.5rem", drag: "free", arrows: false }}
                >
                    {animeRecommendations.slice(5, 25).map((anime) => {
                    return (
                        <SplideSlide key={anime.mal_id}>
                        <div className="w-[425px] h-[600px]">
                            <Link
                            to={`/anime/${anime.entry[0].mal_id}`}
                            key={anime.entry[0].mal_id}
                            className=""
                            >
                            <img
                                src={anime.entry[0].images.jpg.large_image_url}
                                alt=""
                                className="w-full h-full object-cover rounded-3xl relative"
                            />
                            <div className="absolute bottom-0 bg-secondary w-[425px] top-[30rem] opacity-75 text-center rounded-b-3xl">
                                <h1 className="text-3xl text-[#ffffff] text-wrap pt-6 text-bold">
                                {anime.entry[0].title}
                                </h1>
                            </div>
                            </Link>
                        </div>
                        </SplideSlide>
                    );
                    })}
                </Splide>
                </div>
                {/* for laptop */}
                <div className="mt-6 md:block hidden">
                <Splide
                    options={{ perPage: 4, gap: "0.5rem", drag: "free", arrows: false }}
                >
                    {animeRecommendations.slice(5, 25).map((anime) => {
                    return (
                        <SplideSlide key={anime.mal_id}>
                        <div className="w-[230px] h-[300px]">
                            <Link
                            to={`/anime/${anime.entry[1].mal_id}`}
                            key={anime.entry[1].mal_id}
                            className=""
                            >
                            <img
                                src={anime.entry[1].images.jpg.large_image_url}
                                alt=""
                                className="w-full h-full object-cover rounded-3xl relative"
                            />
                            <div className="absolute bottom-0 bg-secondary w-[230px] top-55 opacity-75 text-center rounded-b-3xl">
                                <h1 className="text-lg text-[#ffffff] text-wrap pt-3 text-bold">
                                {anime.entry[1].title}
                                </h1>
                            </div>
                            </Link>
                        </div>
                        </SplideSlide>
                    );
                    })}
                </Splide>
                </div>
                {/* for mobile */}
                <div className="mt-6 md:hidden block">
                <Splide
                    options={{ perPage: 3, gap: "0.5rem", drag: "free", arrows: false }}
                >
                    {animeRecommendations.slice(5, 25).map((anime) => {
                    return (
                        <SplideSlide key={anime.mal_id}>
                        <div className="w-[425px] h-[600px]">
                            <Link
                            to={`/anime/${anime.entry[1].mal_id}`}
                            key={anime.entry[1].mal_id}
                            className=""
                            >
                            <img
                                src={anime.entry[1].images.jpg.large_image_url}
                                alt=""
                                className="w-full h-full object-cover rounded-3xl relative"
                            />
                            <div className="absolute bottom-0 bg-secondary w-[425px] top-[30rem] opacity-75 text-center rounded-b-3xl">
                                <h1 className="text-3xl text-[#ffffff] text-wrap pt-6 text-bold">
                                {anime.entry[1].title}
                                </h1>
                            </div>
                            </Link>
                        </div>
                        </SplideSlide>
                    );
                    })}
                </Splide>
                </div>
            </div>
            <div className="">
                <Genres/>
            </div>
      </div>
    </>
    );
};
export default AnimeRecommendations;
