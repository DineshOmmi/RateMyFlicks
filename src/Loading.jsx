import React from "react"
import anime from "./assets/images/anime.jpg"

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
        <img src={anime} alt="" className="w-[1520px] h-full object-cover opacity-30 relative"/>
      <div className="text-white text-center absolute">
        <div className="w-20 h-20 border-t-4 border-gray-300 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-300 font-semibold text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
