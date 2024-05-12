import { useApi } from "../context/ApiContext";
const Genres = () => {
  const { genres } = useApi();
  const colors = ['#e76f51', '#00b4d8', '#a3b18a', '#ffecd1', '#c8b6ff', '#09f04a', '#a60e2e', 'cyan', 'magenta','coral'];
  return (
    <>
      <div className="">
          <h1 className="md:text-4xl text-5xl text-secondary mt-8">Genres</h1>
          <div className="md:w-[400px] w-full md:h-[500px] h-[1000px] grid grid-cols-3 gap-4 bg-[#020D19] p-5 rounded-3xl mt-4 md:pb-auto pb-10">
            {genres.slice(0, 24).map((anime, index) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              return (
                <div
                  className="flex items-center justify-center"
                  key={anime.mal_id}
                >
                  <h1 className={`text-primary md:text-sm text-4xl font-bold text-nowrap hover:bg-primary hover:bg-opacity-10 hover:rounded-lg p-2`} style={{ color }}>
                    {anime.name}
                  </h1>
                </div>
              );
            })}
            <div className="md:w-[360px] w-[1300px] md:px-2 py-1 px-4 bg-primary opacity-20 text-[#000000] md:text-lg text-5xl text-center md:rounded-xl rounded-3xl md:pt-2 pt-7 font-bold hover:opacity-30 md:ml-0 ml-5">ShowMore</div>
          </div>
      </div>
      
    </>
  );
};
export default Genres;
