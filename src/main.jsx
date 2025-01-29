import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import "./index.css";
import HomePage from "./HomePage/HomePage";
import SignUp from "./SignUp";
import Login from "./Login";
import { AuthProvider } from "./context/AuthContext";
import { ApiProvider } from "./context/ApiContext";
import AnimeItemPage from "./HomePage/AnimeItemPage";
import Saved from "./HomePage/Saved";
import NotFound from "./NotFound";

const router = createBrowserRouter([
    {
      path : "/" ,
      element: <HomePage/>,
      errorElement:<NotFound />
    },
    {
      path : "/home" ,
      element: <HomePage/>
    },
    {
      path : "/SignUp" ,
      element: <SignUp/>
    },
    {
      path : "/Login" ,
      element: <Login/>
    },
    {
      path : "/anime/:id" ,
      element: <AnimeItemPage/>
    },
    {
      path : "/Saved" ,
      element: <Saved/>
    },
    {
      path: "*",  // This will catch all unmatched routes
      element: <NotFound />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
          <RouterProvider router={router}/>
      </ApiProvider> 
    </AuthProvider>
  </React.StrictMode>
);
