import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navBar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import './style.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

function App() {

  const {currentUser} = useContext(AuthContext); //this means we are not logged in yet

  const{darkMode} = useContext(DarkModeContext);



  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />{" "}
            {/*Outlet is the variable part of the overall layout structure*/}
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({children}) =>{ //children are the protected routes
    if(!currentUser) { //if no current user (not logged in, we are going to be naviagated to /login page)
      return <Navigate to="/login"/>
    }

    return children //if logged in, we will see our children, our protected layout (our Home page and Profile page)as specified below
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute> {/*everything written inside ProtectedRoute, will be checked/protected by ProtectedRoute function above*/}
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
