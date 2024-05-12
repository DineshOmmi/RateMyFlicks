import { useEffect, useState } from "react";
import Loading from "../Loading";
import NavBar from "./NavBar";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);
  return (
    <>
      <div>
        {loading ? <Loading/> : <NavBar /> }
      </div>
    </>
  );
};
export default HomePage;
