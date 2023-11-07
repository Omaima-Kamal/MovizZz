import MovieCard from "../../../components/MovieCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from "react-bootstrap/Alert";

const ListMovies = () => {
    const [movies, setMovies] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        setMovies({ ...movies, loading: true });
        axios
            .get("http://localhost:4000/movies", {
                params: {
                    search: search,
                },
            })
            .then((resp) => {
                setMovies({ ...movies, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setMovies({
                    ...movies,
                    loading: false,
                    err: "Something went wrong, please try again later !"
                });
            })
        // eslint-disable-next-line 
    }, [movies.reload]);

    const searchMovies = (e) => {
        e.preventDefault();
        setMovies({ ...movies, reload: movies.reload + 1 })
    }
    return (
        <div className="home-container p-5 m-2">
            {/* Loader */}
            {movies.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {/* LIST MOVIES */}
            {movies.loading === false && movies.err == null && (
                <>
                    {/* Filter */}
                    <Form onSubmit={searchMovies}>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Control 
                            style={{
                               width: "500px",
                                borderRadius: "50%",
                                marginLeft: "500px",
                            }}
                                type="text"
                                placeholder="Search Movies"
                                className="rounded-0"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button className="btn btn-dark rounded-0">Search</Button>
                        </Form.Group>
                    </Form>
                    {/* List Movies */}
                    <div className="row">
                        {movies.results.map((movie) => (
                            <div className="col-3 card-movie-container mt-2 mb-2"
                                style={{
                                  
                                }} key={movie.d}>
                                <MovieCard
                                    name={movie.name}
                                    description={movie.description}
                                    image={movie.image_url}
                                    id={movie.id}
                                />
                            </div>
                        ))}

                    </div>
                </>
            )
            }

            {/* ERRORS HANDLING */}
            {
                movies.loading === false && movies.err != null && (
                    <Alert className="p-2" variant="danger">
                        {movies.err}
                    </Alert>
                )
            }

            {/* NO MOVIES */}
            {
                movies.loading === false && movies.err == null && movies.results.length === 0 && (
                    <Alert className="p-2" variant="info">
                        No Movies, please try again later !
                    </Alert>
                )
            }
        </div >
    );
};

export default ListMovies; 