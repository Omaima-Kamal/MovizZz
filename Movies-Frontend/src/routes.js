import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import ManageMovies from "./pages/manageMovies/ManageMovies";
import AddMovies from "./pages/manageMovies/AddMovies";
import UpdateMovies from "./pages/manageMovies/UpdateMovies";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import ListMovies from "./pages/Auth/listMovies/ListMovies";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/movie-list",
                element: <ListMovies />
            },
            {
                path: ":id",
                element: <MovieDetails />
            },
            // GUEST MIDDLEWARE
           {
            element: <Guest />,
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
            ]
           },
            {
                path: "/manage-movies",
                element: <Admin />,
                children: [
                    {
                        path: "",
                        element: <ManageMovies />
                    }, {
                        path: "add",
                        element: <AddMovies />
                    }, {
                        path: ":id",
                        element: <UpdateMovies />
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={"./"} />
    }

]);