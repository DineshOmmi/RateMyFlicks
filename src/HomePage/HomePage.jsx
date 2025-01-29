// import { useEffect, useState } from "react";
// import Loading from "../Loading";
// import NavBar from "./NavBar";

// const HomePage = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000); 
//   }, []);
//   return (
//     <>
//       <div>
//         {loading ? <Loading/> : <NavBar /> }
//       </div>
//     </>
//   );
// };
// export default HomePage;
import { useEffect, useState } from "react";
import Loading from "../Loading";
import NavBar from "./NavBar";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem("hasLoaded") && currentUser; 
  });

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasLoaded", "true"); 
      }, 3000);
    }
  }, [loading]);

  return <>{loading ? <Loading /> : <NavBar />}</>;
};

export default HomePage;
