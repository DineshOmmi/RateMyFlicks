import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Saved = () => {
  const [myList, setMyList] = useState([]);
  const [anime, setAnime] = useState([]); // Changed to array for storing multiple anime objects
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  const { currentUser } = useAuth();
  const [fillColor, setFillColor] = useState('none');

  const changeFill = () => {
    setFillColor(prevFill => prevFill === '#b23a48' ? 'none' : '#b23a48');
  };

  useEffect(() => {
    // Fetch anime data for each ID in myList
    const fetchData = async () => {
      const animeData = await Promise.all(
        myList.map(async (id) => {
          const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
          const data = await response.json();
          return data.data;
        })
      );
      setAnime(animeData); // Update anime state with fetched data
    };

    fetchData();
  }, [myList]); // Dependency on myList

  useEffect(() => {
    // Fetch saved data when currentUser changes
    const getSavedData = async (uid) => {
      const userRef = doc(db, "savedData", uid);
      try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          const savedData = docSnapshot.data();
          setMyList(savedData.saveList); // Update myList state with saved data
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error getting user data: ", error);
      }
    };
    getSavedData(currentUser.uid);
  }, [currentUser.uid]); // Dependency on currentUser.uid

  return (
    <div className="bg-secondary h-[370vh] md:w-[1520px] w-[1400px]">
      <div
        className="flex items-center pl-5 pt-5 space-x-2 cursor-pointer"
        onClick={handleBack}
      >
        <FaArrowLeft color="#edf2f4"  className="h-9 w-9 md:h-4 md:w-4" />
        <p className="text-primary text-5xl md:text-xl">Home</p>
      </div>
      <div className="flex flex-col items-center w-full h-full">
        <h1 className="text-primary text-6xl md:text-3xl font-bold pt-32 md:pt-10 pb-10 md:pb-5">
          WATCHLIST
        </h1>
        <div className="md:w-[1000px] w-[1300px] bg-primary flex flex-col rounded-3xl p-10 gap-10 relative">
          {/* Render each anime's details */}
          {anime.map((animeItem) => (
            <div
              key={animeItem.id}
              className="flex flex-row space-x-20 border-2 border-shadow p-2 rounded-2xl"
            >
              <img
                src={animeItem.images?.jpg.large_image_url}
                alt={animeItem.title}
                className="w-72 md:w-56 h-96 md:h-64"
              />
              <div className="flex flex-col gap-4">
                <h1 className="text-5xl md:text-3xl pt-14 md:pt-3">{animeItem.title}</h1>
                <h1 className="text-xl md:text-base">
                  <span className="font-bold">Aired : </span>
                  {animeItem.aired?.string}
                </h1>
                <h1 className="text-xl md:text-base">
                  <span className="font-bold">Rating : </span>
                  {animeItem.rating}
                </h1>
                <h1 className="text-xl md:text-base">
                  <span className="font-bold">Rank : </span>
                  {animeItem.rank}
                </h1>
                <h1 className="text-xl md:text-base">
                  <span className="font-bold">Season : </span>
                  {animeItem.season}
                </h1>
                <h1 className="text-xl md:text-base">
                  <span className="font-bold">Status : </span>
                  {animeItem.status}
                </h1>
              </div>
              <div className="self-end absolute right-14 flex">
              <div className="" onClick={changeFill}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={fillColor}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-20 h-20 md:w-10 md:h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
              </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 md:w-10 md:h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Saved;
