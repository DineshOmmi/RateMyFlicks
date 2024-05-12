import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_POPULAR_ANIME_MOVIE = "GET_POPULAR_ANIME_MOVIE";
const GET_ANIME_RECOMMENDATIONS = "GET_ANIME_RECOMMENDATIONS";
const GET_GENRES = "GET_GENRES";

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case GET_POPULAR_ANIME_MOVIE:
      return { ...state, popularAnimeMovie: action.payload, loading: false };
    case GET_ANIME_RECOMMENDATIONS:
      return { ...state, animeRecommendations: action.payload, loading: false };
    case GET_GENRES:
      return { ...state, genres: action.payload, loading: false };
    default:
      return state;
  }
};

export function ApiProvider({ children }) {
  const intialState = {
    popularAnime: [],
    popularAnimeMovie: [],
    animeRecommendations: [],
    genres: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
    topAnime: [],
  };
  const [state, dispatch] = useReducer(reducer, intialState);
  const [search, setSearch] = useState("");

  //handle change
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("please enter a search term");
    }
  };

  // fetch Upcoming anime

  const GetUpcomingAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
    const data = await response.json();
    dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
  };

  // fetch Airing anime
  const GetAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
  };

  // fetch popular anime
  const GetPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  // fetch popular movie
  const GetPopularAnimeMovie = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity&&type=movie`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME_MOVIE, payload: data.data });
  };
  // fetch anime recommendations :
  const GetAnimeRecommendations = async () => {
    dispatch({ type: LOADING });
    const response = await fetch("https://api.jikan.moe/v4/recommendations/anime");
    const data = await response.json();
    dispatch({ type: GET_ANIME_RECOMMENDATIONS, payload: data.data});
  };
  // fetch anime Genres :
  const GetGenres = async () => {
    dispatch({ type: LOADING });
    const response = await fetch("https://api.jikan.moe/v4/genres/anime");
    const data = await response.json();
    dispatch({ type: GET_GENRES, payload: data.data});
  };

  // fetch search anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}$order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data});
  };

  useEffect(() => {
    // Fetch popular anime
    GetPopularAnime();
  
    // Fetch popular anime movies after a delay
    const timeoutId = setTimeout(() => {
      GetPopularAnimeMovie();
    }, 1000); // Delay fetching popular anime movies by 1 second
    const timeout = setTimeout(() => {
      GetAnimeRecommendations();
    }, 2000);
    const timeouts = setTimeout(() => {
      GetGenres();
    }, 3000);
    // Cleanup function to cancel the timeout if the component unmounts
    return () => clearTimeout(timeoutId,timeout,timeouts);
  }, []);
  

  return (
    <ApiContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        GetPopularAnime,
        GetPopularAnimeMovie,
        GetAnimeRecommendations,
        GetUpcomingAnime,
        GetAiringAnime,
        GetGenres
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
