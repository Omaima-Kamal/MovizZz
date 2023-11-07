import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const auth = getAuthUser();
    const Logout = () => {
        removeAuthUser();
        navigate("/");
    };
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link className="nav-link" to={"/"}>MovizZz</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" to={"/"}>Home</Link>
                    <Link className="nav-link" to={"/movie-list"}>Movies List</Link>
                    {/* unAuthenticated Routes */}
                    {!auth && (
                        <>
                            <Link className="nav-link" to={"/login"}>Login</Link>
                            <Link className="nav-link" to={"/register"}>Register</Link>
                        </>
                    )}
                    {/* Admin Routes */}
                    {auth && auth[0].role === 1 && (
                        <>
                            <Link className="nav-link" to={"/manage-movies"}>Manage Movies</Link>
                        </>
                    )}
                </Nav>
                <Nav className="ms-auto">
                    {/* Authenticated Routes */}
                    {auth && (
                        <Link className="nav-link" onClick={Logout}>Logout</Link>
                    )
                    }

                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;