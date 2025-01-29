import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

const AnimeItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [saveAnime, setSaveAnime] = useState(false);
  const [saveList, setSaveList] = useState([]);
  const { currentUser, storeSavedData } = useAuth();

  // Destructure anime data
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  // Fetch anime details
  const getAnime = async (animeId) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const data = await response.json();
      setAnime(data.data);
      setGenres(data.data.genres || []); // Extract genres from the response
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  // Fetch characters
  const getCharacters = async (animeId) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/characters`
      );
      const data = await response.json();
      setCharacters(data.data || []);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  // Handle saving anime
  const handleSave = (animeId) => {
    setSaveAnime((prevSaveAnime) => !prevSaveAnime);

    setSaveList((prevSaveList) => {
      const updatedSaveList = prevSaveList.includes(animeId)
        ? prevSaveList.filter((savedId) => savedId !== animeId)
        : [...prevSaveList, animeId];

      if (currentUser) {
        storeSavedData(currentUser.uid, updatedSaveList);
      }

      return updatedSaveList;
    });
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    getAnime(id);
    getCharacters(id);

    // Fetch saved data if user is logged in
    const getSavedData = async (uid) => {
      if (!uid) return;

      try {
        const userRef = doc(db, "savedData", uid);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          const savedData = docSnapshot.data();
          setSaveList(savedData.saveList || []);
          setSaveAnime(savedData.saveList.includes(id));
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    getSavedData(currentUser.uid);
  }, [id, currentUser, navigate]); // Dependencies ensure updates when `id` or `currentUser` changes

  return (
    <div className="bg-secondary  md:w-[1520px] w-[1400px] flex flex-col justify-center items-center">
      <div className="flex flex-row md:ml-[260px] ml-[60px] mt-6 self-start  justify-between md:w-[1000px] w-[1300px]">
        <h1 className="text-primary md:text-4xl text-9xl">{title}</h1>
        <div className="">
            {saveAnime ? (
              <div
                className="md:px-2 md:py-2 px-4 py-6 border-[3px] border-[#f35b04] md:mr-3 mr-6"
                onClick={() => handleSave(id)}
              >
                <BsBookmarkCheckFill
                  fill="#f35b04"
                  className="md:h-[22px] md:w-[22px] h-[64px] w-[64px]"
                />
              </div>
            ) : (
              <div
                className="md:px-2 md:py-2 px-4 py-6 border-[3px] border-[#f35b04] md:mr-3 mr-6"
                onClick={() => handleSave(id)}
              >
                <BsBookmark color="#f35b04" className="md:h-[22px] md:w-[22px] h-[64px] w-[64px]" />
              </div>
            )}
        </div>
      </div>
      <div className="bg-primary md:w-[1000px] w-[1300px] h-full mt-3 rounded-2xl mb-3 ">
        <div className="flex md:flex-row flex-col p-10 md:space-x-52">
          <div className="">
            <img
              src={images?.jpg.large_image_url}
              alt=""
              className="md:h-[500px] md:w-auto object-cover rounded-xl w-full"
            />
          </div>
          <div className="flex flex-col md:space-y-6 space-y-12 md:text-base text-6xl md:mt-0 mt-12">
            <p className="">
              <span className="font-bold">Aired: </span>
              <span className="">{aired?.string}</span>
            </p>
            <p className="">
              <span className="font-bold">Rating: </span>
              <span className="">{rating}</span>
            </p>
            <p className="">
              <span className="font-bold">Rank: </span>
              <span className="">{rank}</span>
            </p>
            <p className="">
              <span className="font-bold">Score: </span>
              <span className="">{score}</span>
            </p>
            <p className="">
              <span className="font-bold">Scored By: </span>
              <span className="">{scored_by}</span>
            </p>
            <p className="">
              <span className="font-bold">Popularity: </span>
              <span className="">{popularity}</span>
            </p>
            <p className="">
              <span className="font-bold">Status: </span>
              <span className="">{status}</span>
            </p>
            <p className="">
              <span className="font-bold">Source: </span>
              <span className="">{source}</span>
            </p>
            <p className="">
              <span className="font-bold">Season: </span>
              <span className="">{season}</span>
            </p>
            <p className="">
              <span className="font-bold">Duration: </span>
              <span className="">{duration}</span>
            </p>
            <div className="flex flex-row space-x-4">
              {genres.slice(0,4).map((item) => {
                return (
                  <div
                    className="md:px-2 md:py-2 px-3 py-3 md:rounded-lg rounded-3xl bg-secondary text-primary font-bold w-auto md:text-sm text-6xl"
                    key={item.mal_id}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-10 pb-5 md:text-base text-5xl text-justify leading-snug">
          {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
          {showMore ? (
            <span
              className="text-secondary cursor-pointer transition-all delay-500 font-bold"
              onClick={() => {
                setShowMore(false);
              }}
            >
              {" "}
              Show Less
            </span>
          ) : (
            <span
              className="text-secondary cursor-pointer transition-all delay-500 font-bold"
              onClick={() => {
                setShowMore(true);
              }}
            >
              {" "}
              Read More
            </span>
          )}
        </div>
      </div>
      <h1 className="text-primary md:text-4xl text-8xl ml-[60px] mt-6 self-start">
        Trailer
      </h1>
      <div className="bg-primary md:w-[880px] w-[1300px] h-full mt-3 rounded-2xl mb-3 md:px-10 md:py-10 px-12 py-12">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title={title}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="md:w-[800px] md:h-[450px] w-[1200px] h-[1000px]"
          ></iframe>
        ):(<div className="text-3xl text-center">Trailer Not Found</div>)}
      </div>
      <h1 className="text-primary md:text-4xl text-8xl ml-[60px] mt-6 self-start">
        Characters
      </h1>
      <div className="grid grid-cols-5 gap-3 bg-primary md:w-[1000px] w-[1300px] h-full mt-3 rounded-2xl md:mb-3 mb-24 px-10 py-10">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link to={`/character/${mal_id}`} key={index}>
              <div className="bg-[#dee2e6] p-2 hover:transition-all hover:translate-y-2 hover:ease-in-out">
                <img
                  src={images?.jpg.image_url}
                  alt=""
                  className="w-[300px] h-[300px] object-cover"
                />
                <h1 className="">{name}</h1>
                <p className="text-green-600">{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default AnimeItemPage;
