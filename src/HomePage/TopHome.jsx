import { useState } from "react";
import { useApi } from "../context/ApiContext";
import Popular from "./Popular";
import Upcoming from "./Upcoming";
import Airing from "./Airing";
import fire from "../assets/images/fire-ant.png";
import upcoming from "../assets/images/upcoming.png";
import airing from "../assets/images/announcement.png";
import { IoSearchSharp } from "react-icons/io5";

const TopHome = () => {
  const {
    handleChange,
    handleSubmit,
    search,
    searchAnime,
    GetUpcomingAnime,
    GetAiringAnime,
    GetPopularAnime,
  } = useApi();
  const [render, setRender] = useState("popular");
  const {isSearch , searchResults} = useApi();

  const switchComponent = () => {
    switch (render) {
      case "popular":
        return <Popular render={render} />;
      case "airing":
        return <Airing render={render} />;
      case "upcoming":
        return <Upcoming render={render} />;
      default:
        return <Popular render={render} />;
    }
  };
  return (
    <div className="md:text-lg text-2xl text-secondary">
      <header>
          <div className="flex flex-row justify-between items-center mx-auto w-[1000px] mt-12">
            <div className="flex flex-row space-x-2 justify-center items-center border-2 border-secondary px-2 py-2 rounded-xl">
                <img src={fire} alt="" className="w-8 h-8"/>
                <button
                  className=""
                  onClick={() => {
                    setRender("popular");
                    GetPopularAnime();
                  }}
                >
                  Popular
                </button>
            </div>
            
            <form action="" className="" onSubmit={handleSubmit}>
              <div className="flex flex-row bg-primary rounded-full border-2 border-secondary relative ">
                    <div className="flex  items-center w-96 py-1">
                      <IoSearchSharp
                        size="37px"
                          className="p-1 mx-1 text-secondary "
                        />
                      <input
                        type="text" 
                        placeholder="Search Anime"
                        value={search}
                        onChange={handleChange}
                        className="p-1 bg-transparent outline-none w-full text-secondary text-xl"
                      />
                    </div>
                    <button type="submit" className=" border-l-[3px] border-secondary rounded-l-full px-3 py-1">
                        Search
                    </button>
              </div>
              <div className="absolute top-[100px] text-base ml-40">
                {isSearch ? (<div className="">{searchResults.length} Results Found</div>):(!searchResults ? (<div className=""></div>):"")}
              </div>
            </form>
            <div className="flex flex-row space-x-2 justify-center items-center border-2 border-secondary px-2 py-2 rounded-xl">
                <img src={airing} alt="" className="w-8 h-8"/>
                <button
                  className=""
                  onClick={() => {
                    setRender("airing");
                    GetAiringAnime();
                  }}
                >
                  Airing
                </button>
            </div>
            <div className="flex flex-row space-x-2 justify-center items-center border-2 border-secondary px-2 py-2 rounded-xl">
                <img src={upcoming} alt="" className="w-8 h-8"/>
                <button
                  className=""
                  onClick={() => {
                    setRender("upcoming");
                    GetUpcomingAnime();
                  }}
                >
                  Upcoming
                </button>
            </div>
          </div>
        <div className=" w-[1440px] mx-auto mt-12 text-secondary">
          <h1 className="text-5xl md:text-4xl ml-9 md:ml-0">
            {render === "popular"
              ? "Popular Anime"
              : render === "airing"
                ? "Airing Anime"
                : "Upcoming Anime"}
          </h1>
        </div>
      </header>
      {switchComponent()}
    </div>
  );
};
export default TopHome;
