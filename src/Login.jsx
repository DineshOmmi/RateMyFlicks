import Logo from "./assets/images/Logo.png";
import google from "./assets/images/google.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  
  const [error,SetError] = useState(null);
  const [loading,setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()
  const {Login} = useAuth()

  const handleSubmit = async(e) => {

    e.preventDefault()
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);
    try{
      SetError(null)
      await Login(email,password)
      if(!error){
        navigate('/home')
      }
    }catch(error){
      SetError("Failed To Sign In")
    }
    setLoading(false);

  }
  return (
    <div className="w-screen md:h-screen h-[93vh] flex flex-row justify-center items-center bg-secondary">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-2xl p-6 rounded-lg bg-primary gap-3 w-[384px] md:max-w-[500px] sm:min-w-[384px]"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img src={Logo} alt="" className="-mt-8 w-52" />
        </div>
        {/* Login */}
        <div className="-mt-6">
          <h1 className="text-xl text-center text-secondary">
            Login to RateMyFlicks
          </h1>
        </div>
        {
          error && (<div className="text-center p-2 rounded-md bg-red-200 text-red-700">{error}</div>)
        }
        <input
          type="text"
          className="outline-none rounded-md bg-transparent border-2 p-1 text-xl border-[#adb5bd]"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          type="password"
          className="outline-none rounded-md bg-transparent border-2 p-1 text-xl border-[#adb5bd]"
          placeholder="Password"
          ref={passwordRef}
        />
        <div className="w-full text-center cursor-pointer text-sm">
          <span className="text-[#0171D3]">Forget Password ?</span>
        </div>
        <button className="p-2 bg-[#0171D3] rounded-md text-primary" disabled={loading}>
            {loading ? "Loging In ..." : "Login"}
        </button>
        
        <div className="w-full flex flex-row justify-center items-center space-x-2">
          <hr className="size-1/2 border-[#adb5bd]" />
          <p className="">or</p>
          <hr className="size-1/2 border-[#adb5bd]" />
        </div>
        {/* <div className="w-full flex flex-row border-[#adb5bd] border rounded-md p-2 items-center space-x-14 bg-[#183153] cursor-pointer">
          <FontAwesomeIcon icon={faFacebook} inverse className="size-6" />
          <p className="text-primary">Login with Facebook</p>
        </div> */}
        <div className="w-full flex flex-row border-[#adb5bd] border rounded-md p-2 items-center space-x-14 cursor-pointer">
          <img src={google} alt="" className="w-6 h-6" />
          <p className="">Login with Google</p>
        </div>
        <div className="text-sm text-center">
          Don&#39;t have an account?
          <span className="text-[#0171D3] cursor-pointer"><Link to="/SignUp">Signup</Link></span>
        </div>
      </form>
    </div>
  );
};
export default Login;
