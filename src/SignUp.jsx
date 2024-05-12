import Logo from "./assets/images/Logo.png";
import google from "./assets/images/google.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";

const SignUp = () => {

  const {SignUp,currentUser,storeUserData} = useAuth();
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error,SetError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
      e.preventDefault()
      if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return SetError("Passwords does not match");
      }
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const userName = userRef.current.value;
      
      setLoading(true);
      try{
        SetError(null)
        await SignUp(email,password).then(async(userCredential)=>{
          const user = userCredential.user;
          const uid = user.uid;
          try{
            storeUserData(uid, userName);
          }catch (e) {
              console.error("Error adding document: ", e);
          }
        })
        
        if(!error){
          navigate('/home')
        }
      }catch(error){
        SetError(error.message)
      }
      setLoading(false);
      
  }
  console.log(currentUser)
  return (
    <div className="w-screen md:h-screen h-[93vh] flex flex-row justify-center items-center bg-secondary">
      <form
        className="flex flex-col shadow-2xl p-6 rounded-lg bg-primary gap-3 w-[384px] md:max-w-[500px] sm:min-w-[384px]"
        onSubmit={handleSubmit}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img src={Logo} alt="" className="-mt-8 w-52" />
        </div>
        {/* Sign Up */}
        <div className="-mt-6">
          <h1 className="text-xl text-center text-secondary">
            Create a new account
          </h1>
        </div>
        {
          error && (<div className="text-center p-2 rounded-md bg-red-200 text-red-700">{error}</div>)
        }
        <input
          type="text"
          className="outline-none rounded-md bg-transparent border-2 p-1 text-xl border-[#adb5bd]"
          placeholder="UserName"
          ref={userRef}
          required
        />
        <input
          type="email"
          className="outline-none rounded-md bg-transparent border-2 p-1 text-xl border-[#adb5bd]"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <input
          type="password"
          className="outline-none rounded-md bg-transparent border-2 p-1 text-xl border-[#adb5bd]"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <input
          type="Password"
          className="outline-none rounded-md bg-transparent border-2 p-1 text-xl border-[#adb5bd]"
          placeholder="Confirm Password"
          ref={passwordConfirmRef}
          required
        />
        <button
          className="p-2 bg-[#0171D3] rounded-md text-primary cursor-pointer"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="w-full flex flex-row justify-center items-center space-x-2">
          <hr className="size-1/2 border-[#adb5bd]" />
          <p className="">or</p>
          <hr className="size-1/2 border-[#adb5bd]" />
        </div>
        {/* <div className="w-full flex flex-row border-[#adb5bd] border rounded-md p-2 items-center space-x-14 bg-[#183153] cursor-pointer">
          <FontAwesomeIcon icon={faFacebook} inverse className="size-6" />
          <p className="text-primary">Sign up with Facebook</p>
        </div> */}
        <div className="w-full flex flex-row border-[#adb5bd] border rounded-md p-2 items-center space-x-14 cursor-pointer">
          <img src={google} alt="" className="w-6 h-6" />
          <p className="">Sign up with Google</p>
        </div>
        <div className="text-sm text-center">
          Already have an account?
          <span className="text-[#0171D3] cursor-pointer"><Link to="/login">Login</Link></span>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
