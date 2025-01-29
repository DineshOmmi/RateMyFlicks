import { useState, useRef } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import TopHome from "./TopHome.jsx";
import TopCategories from "./TopCategories.jsx";
import AnimeRecommendations from "./AnimeRecommendations.jsx";
import Footer from "./Footer.jsx";

const NavBar = () => {
  const Flicks = ["Anime", "Movies", "TvShows"];
  const Saved = ["AnimeList", "MoviesList", "TvShowsList"];
  const profile = ["profile", "Logout"];
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, Name } = useAuth();

  //nav bar items open and close usestate
  const [navItemOpen, setnavItemOpen] = useState(false);
  const [navItem, setnavItem] = useState(false);
  const handleitem = () => {
    if (navItemOpen === false) {
      setnavItem(false);
      setnavItemOpen(true);
    } else {
      setnavItemOpen(false);
    }
  };
  const handlenavitem = () => {
    if (navItem === false) {
      setnavItemOpen(false);
      setnavItem(true);
    } else {
      setnavItem(false);
    }
  };

  //handle btn open in hamberger menu
  const [btnOpen, setBtnOpen] = useState(false);
  const handleBtn = () => {
    if (btnOpen === true) {
      setBtnOpen(false);
    } else {
      setBtnOpen(true);
    }
  };

  const [isOpen, SetIsOpen] = useState(false);
  const [isOpenSaved, SetIsOpenSaved] = useState(false);
  const [isOpenProfile, SetIsOpenProfile] = useState(false);

  const [dropDownValue, setDropDownValue] = useState(null);
  const [SavedValue, SetSavedValue] = useState(null);
  const [SavedProfileValue, SetSavedProfileValue] = useState(null);

  //handle AnimeList
  const handleAnimeList = () => {
    navigate("/Saved");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("hasLoaded"); // Reset loading state for next login
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  
  
  // For-Flicks
  const handleMouseEnter = () => {
    SetIsOpenProfile(false);
    SetIsOpenSaved(false);
    clearTimeout(timeoutRef.current);
    SetIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      SetIsOpen(false);
    }, 200);
  };
  const handleMenuMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };
  const handleMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      SetIsOpen(false);
    }, 200);
  };
  const handleSelectFlicks = (item) => {
    setDropDownValue(item);
    SetIsOpen(false);
  };
  // For-Saved
  const handleSavedEnter = () => {
    SetIsOpenProfile(false);
    SetIsOpen(false);
    clearTimeout(timeoutRef.current);
    SetIsOpenSaved(true);
  };
  const handleSavedLeave = () => {
    timeoutRef.current = setTimeout(() => {
      SetIsOpenSaved(false);
    }, 200);
  };
  const handleSavedMenuEnter = () => {
    clearTimeout(timeoutRef.current);
  };
  const handleSavedMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      SetIsOpenSaved(false);
    }, 200);
  };
  const handleSelectSaved = (item) => {
    SetSavedValue(item);
    SetIsOpenSaved(false);
    if (item === "AnimeList") {
      handleAnimeList();
    }
  };
  //for profiles
  const handleProfileEnter = () => {
    SetIsOpenSaved(false);
    SetIsOpen(false);
    clearTimeout(timeoutRef.current);
    SetIsOpenProfile(true);
  };
  const handleProfileLeave = () => {
    timeoutRef.current = setTimeout(() => {
      SetIsOpenProfile(false);
    }, 200);
  };
  const handleProfileMenuEnter = () => {
    clearTimeout(timeoutRef.current);
  };
  const handleProfileMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      SetIsOpenProfile(false);
    }, 200);
  };
  const handleProfileSaved = (item) => {
    SetSavedProfileValue(item);
    SetIsOpenProfile(false);
    if (item == "Logout") {
      handleLogout();
    }
  };
  //button for hamberger menu

  return (
    <>
      <div className="md:w-[1520px] w-[1440px] md:h-[570vh] h-[1300vh] bg-secondary relative text-primary">
        <div className="max-w-[1480px] mx-auto md:p-2 p-10">
          <nav className="flex flex-row justify-between items-center">
            {/* Project Logo */}
            <div className="flex flex-row items-center space-x-1 font-bold">
              <h1 className="md:text-xl text-6xl">RATE</h1>
              <span className="md:text-xs text-3xl text-[#F49F1C]">My</span>
              <h1 className="md:text-xl text-6xl">FLICKS</h1>
            </div>
            {/* List of buttons */}
            <ul className="md:flex flex-row md:space-x-10 items-center font-bold md:ml-10 hidden">
              <li className="hover:text-shadow">Home</li>
              {/* Custom Drop down */}
              <div className="">
                <button
                  className="outline-none hover:text-shadow "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Categories
                </button>
                {isOpen && (
                  <div
                    className="w-screen absolute left-0 right-0 top-[50px] bg-secondary"
                    onMouseEnter={handleMenuMouseEnter}
                    onMouseLeave={handleMenuMouseLeave}
                  >
                    <div className="py-3">
                      {Flicks.map((item) => {
                        return (
                          <div
                            key={item}
                            className="cursor-pointer px-3 py-2 ml-48 text-3xl hover:text-shadow"
                            onClick={() => {
                              handleSelectFlicks(item);
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {/* Custom Drop down for Saved*/}
              <div className="">
                <button
                  className="outline-none hover:text-shadow"
                  onMouseEnter={handleSavedEnter}
                  onMouseLeave={handleSavedLeave}
                >
                  MyList
                </button>
                {isOpenSaved && (
                  <div
                    className="w-screen absolute left-0 right-0 top-[50px] bg-secondary"
                    onMouseEnter={handleSavedMenuEnter}
                    onMouseLeave={handleSavedMenuLeave}
                  >
                    <div className="py-3">
                      {Saved.map((item) => {
                        return (
                          <div
                            key={item}
                            className="cursor-pointer px-3 py-2 ml-48 text-3xl hover:text-shadow"
                            onClick={() => {
                              handleSelectSaved(item);
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <li className="hover:text-shadow">Rated</li>
            </ul>

            {/* signup and logout and profile details */}
            <div className="md:flex flex-row justify-end items-center w-full font-bold ml-10 hidden">
              <div className="md:flex hidden">
                {currentUser ? (
                  <div className="">
                    <div
                      className=""
                      onMouseEnter={handleProfileEnter}
                      onMouseLeave={handleProfileLeave}
                    >
                      <div className="hover:text-shadow bg-[#303D55] px-2 py-1 rounded-lg">
                        {Name}
                      </div>
                    </div>
                    {isOpenProfile && (
                      <div
                        className="w-screen absolute left-0 right-0 top-[50px] bg-secondary"
                        onMouseEnter={handleProfileMenuEnter}
                        onMouseLeave={handleProfileMenuLeave}
                      >
                        <div className="py-3">
                          {profile.map((item) => {
                            return (
                              <div
                                key={item}
                                className="cursor-pointer px-3 py-2 ml-48 text-3xl hover:text-shadow"
                                onClick={() => {
                                  handleProfileSaved(item);
                                }}
                              >
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hover:text-shadow bg-[#303D55] px-2 py-1 rounded-lg">
                    <Link to="/SignUp">Sign In</Link>
                  </div>
                )}
              </div>
            </div>
            {/* Hamberger menu */}
            <button
              className={`hamburger ${btnOpen ? "open" : ""} rounded-2xl md:hidden`}
              onClick={handleBtn}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </nav>
          {/* Hamberger menu nav */}
          {btnOpen ? (
            <>
              <div className="mt-[100px] text-6xl flex flex-col space-y-20">
                <div className="flex flex-row space-x-5 items-center">
                  <MdArrowForwardIos size={35} />
                  <h1 className="">Home</h1>
                </div>
                <div
                  className="flex flex-row space-x-5 items-center"
                  onClick={handleitem}
                >
                  {navItemOpen ? (
                    <MdArrowForwardIos size={35} className="rotate-90" />
                  ) : (
                    <MdArrowForwardIos size={35} />
                  )}
                  <h1 className="">Categories</h1>
                </div>
                {navItemOpen ? (
                  <ul className="flex flex-col mt-24 mb-24 ml-12 space-y-20">
                    <li className="">Anime</li>
                    <li className="">Movies</li>
                    <li className="">TvShows</li>
                  </ul>
                ) : (
                  ""
                )}
                <div
                  className="flex flex-row space-x-5 items-center"
                  onClick={handlenavitem}
                >
                  {navItem ? (
                    <MdArrowForwardIos size={35} className="rotate-90" />
                  ) : (
                    <MdArrowForwardIos size={35} />
                  )}
                  <h1 className="">MyList</h1>
                </div>
                {navItem ? (
                  <ul className="flex flex-col mt-16 mb-16 ml-12 space-y-20">
                    <li className="">
                      <Link to="/Saved">AnimeList</Link>
                    </li>
                    <li className="">MoviesList</li>
                    <li className="">TvShowsList</li>
                  </ul>
                ) : (
                  ""
                )}
                <div className="flex flex-row space-x-5 items-center">
                  <MdArrowForwardIos size={35} />
                  <h1 className="">Rated</h1>
                </div>
                {currentUser ? (
                  <div>
                    <div className="mb-[150px] hover:text-shadow bg-[#303D55] w-[92%] absolute bottom-[7200px] text-7xl text-center rounded-2xl py-5">
                      <h1 className="">{Name}</h1>
                    </div>
                    <div className="hover:text-shadow bg-[#303D55] w-[92%] absolute bottom-[7200px] text-7xl text-center rounded-2xl py-5">
                      <Link to="/Login" className="">
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="hover:text-shadow bg-[#303D55] w-[92%] absolute bottom-[7100px] text-7xl text-center rounded-2xl py-5">
                    <Link to="/SignUp" className="">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            ""
          )}
          <Footer/>
        </div>

        {/* DropDown effect */}
        <section
          className={`absolute md:top-[50px] z-10  md:w-[1515px] w-[1440px] h-auto mr-1 md:rounded-3xl rounded-[60px] transform ${isOpen || isOpenSaved || isOpenProfile ? "translate-y-48" : "translate-y-0"} duration-500 ease-in-out bg-primary ${btnOpen ? "translate-y-full bottom-[7000px]" : "translate-y-0"} pb-16`}
        >
          <TopHome />
          <TopCategories/>
          <AnimeRecommendations/>
        </section>
      </div>
    </>
  );
};
export default NavBar;
