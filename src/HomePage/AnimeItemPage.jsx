import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

const AnimeItemPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [saveAnime, setSaveAnime] = useState(false);
  const [saveList, setSaveList] = useState([]);
  const { currentUser, storeSavedData } = useAuth();

  // destructure anime
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

  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //get characters

  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
  };

  //get Genres

  const getGenres = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setGenres(data.data.genres);
  };

  //handle save
  const handleSave = (id) => {
    // Toggles the saveAnime state
    setSaveAnime((prevSaveAnime) => !prevSaveAnime); // Use functional form for asynchronous state update

    // Update saveList based on saveAnime state
    let updatedSaveList;
    if (!saveList.includes(id) && !saveAnime) {
      // Check the updated state
      updatedSaveList = [...saveList, id]; // Add to saveList
    } else {
      updatedSaveList = saveList.filter((savedId) => savedId !== id); // Remove from saveList
    }

    // Update saveList state and store the updated saveList
    try {
      setSaveList(updatedSaveList);
      storeSavedData(currentUser.uid, updatedSaveList);
    } catch (e) {
      console.error("Error updating and storing saved data: ", e);
    }
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
    getGenres(id);

    // display stored data
    const getSavedData = async (uid) => {
      const userRef = doc(db, "savedData", uid);

      try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          const savedData = docSnapshot.data();
          setSaveList(savedData.saveList);
          const isSaved = savedData.saveList.includes(id);
          setSaveAnime(isSaved);
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error getting user data: ", error);
      }
    };
    getSavedData(currentUser.uid);
  }, []);

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
