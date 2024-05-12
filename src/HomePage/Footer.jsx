import anime from "../assets/images/anime.jpg";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="text-6xl text-primary absolute bottom-0 md:h-[500px] md:w-[1519px] w-[1440px] h-[1300px] left-0">
      <img
        src={anime}
        alt=""
        className="w-full h-full object-cover opacity-30 relative"
      />
      <div className="absolute z-10 md:top-10 top-20 md:w-[1440px] w-[1340px] mx-auto left-10">
        <div className="flex flex-row items-center space-x-1 font-bold mt-10 md:ml-8 ml-3">
          <h1 className="md:text-4xl text-6xl">RATE</h1>
          <span className="md:text-lg text-3xl text-[#F49F1C]">My</span>
          <h1 className="md:text-4xl text-6xl">FLICKS</h1>
        </div>
        <div className="py-16 px-4 text-primary flex md:flex-row flex-col w-full justify-evenly">
          <div className="md:border-r-2">
            <p className="md:text-3xl text-5xl md:w-[700px] w-auto text-pretty text-justify pr-4">
              It’s time to ditch the text file. Keep track of your anime easily
              by creating your own list.
            </p>
            <div className="flex justify-around md:w-[75%] my-16">
              <FaFacebookSquare className="md:size-[35px] size-[70px] md:hover:size-[40px] hover:size-[75px] delay-300 transition-all ease-in-out cursor-pointer " />
              <FaInstagramSquare className="md:size-[35px] size-[70px] md:hover:size-[40px] hover:size-[75px] delay-300 transition-all ease-in-out cursor-pointer" />
              <FaTwitterSquare className="md:size-[35px] size-[70px] md:hover:size-[40px] hover:size-[75px] delay-300 transition-all ease-in-out cursor-pointer" />
              <FaGithubSquare className="md:size-[35px] size-[70px] md:hover:size-[40px] hover:size-[75px] delay-300 transition-all ease-in-out cursor-pointer" />
              <FaDribbbleSquare className="md:size-[35px] size-[70px] md:hover:size-[40px] hover:size-[75px] delay-300 transition-all ease-in-out cursor-pointer" />
            </div>
          </div>
          <div className="flex justify-between md:mt-0 mt-10 space-x-20 pl-2">
            <div className="">
              <h6 className="md:text-3xl text-6xl text-primary font-bold hover:underline">
                Top Anime
              </h6>
              <ul className="md:mt-2 mt-5">
                <li className="py-2 md:text-sm text-3xl">One Piece</li>
                <li className="py-2 md:text-sm text-3xl">Naruto Shippuden</li>
                <li className="py-2 md:text-sm text-3xl">Hunter x Hunter</li>
                <li className="py-2 md:text-sm text-3xl">Bleach</li>
              </ul>
            </div>
            <div className="">
              <h6 className="md:text-3xl text-6xl text-primary font-bold hover:underline">
                Top Movies
              </h6>
              <ul className="md:mt-2 mt-5">
                <li className="py-2 md:text-sm text-3xl">Koe no Katachi</li>
                <li className="py-2 md:text-sm text-3xl">Kimi no Na wa</li>
                <li className="py-2 md:text-sm text-3xl">Kimi no Suizou wo Tabetai</li>
                <li className="py-2 md:text-sm text-3xl">Violet Evergarden</li>
              </ul>
            </div>
            <div className="">
              <h6 className="md:text-3xl text-6xl text-primary font-bold hover:underline">
                Top Airing
              </h6>
              <ul className="md:mt-2 mt-5">
                <li className="py-2 md:text-sm text-3xl">One Piece</li>
                <li className="py-2 md:text-sm text-3xl">Boku no Hero Academia</li>
                <li className="py-2 md:text-sm text-3xl">Wind Breaker</li>
                <li className="py-2 md:text-sm text-3xl">Solo Leveling</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-row md:text-base text-3xl text-primary md:bottom-2 -bottom-72 right-10 absolute">
          <p className="px-3 border-r-2 hover:underline ">Terms and Conditions</p>
          <p className="px-3 border-r-2 hover:underline">Privacy Policy</p>
          <p className="px-3  hover:underline">Contact Us</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
