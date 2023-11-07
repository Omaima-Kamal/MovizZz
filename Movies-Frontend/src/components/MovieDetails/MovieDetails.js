import { useEffect, useState } from "react";
import "../../css/MovieDetails.css";
import ReviewMovie from "../ReviewMovie";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from "../../helper/Storage";
import Form from "react-bootstrap/Form";

const MovieDetails = () => {
    const auth = getAuthUser();
    let { id } = useParams();
    const [movie, setMovie] = useState({
        loading: true,
        result: null,
        err: null,
    });

    const [review, setReview] = useState({
        loading: true,
        review: "",
        err: null,
        reload: 0
    });


    useEffect(() => {
        setMovie({ ...movie, loading: true });
        axios
            .get("http://localhost:4000/movies/" + id)
            .then((resp) => {
                setMovie({ ...movie, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setMovie({
                    ...movie,
                    loading: false,
                    err: "Something went wrong, please try again later !"
                });

            })
        // eslint-disable-next-line
    }, [movie.reload]);

    const sendReveiw = (e) => {
        e.preventDefault();
        setReview({ ...review, loading: true });
        axios.post("http://localhost:4000/movies/review", {
            movie_id: id,
            review: review.review
        },
            {
                headers: {
                    token: auth[0].token,
                },
            },

        ).then(resp => {
            setReview({ err: null, review: '', loading: false });
            setMovie({ ...movie, reload: movie.reload + 1 })
        }).catch(errors => {
            setReview({
                ...review,
                loading: false,
                //err: errors.response.data.errors
            })
        })
    }
    return (
        <div className="movie-details-container p-5">
            {/* Loader */}
            {movie.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {/* Movie Details */}
            {movie.loading === false && movie.err == null && (
                <>
                    <div className="row">
                        <div className="col-3">
                            <img className="movie-image"
                                src={movie.result.image_url}
                                alt={movie.result.name} />
                        </div>
                        <div className="col-9" style={{
                            color: "white",
                            marginBottom: "30px",
                        }}>
                            <h3>{movie.result.name}</h3>
                            <p>
                                {movie.result.description}
                            </p>
                        </div>
                    </div>
                    {/* Reviews for Movies */}
                    <hr />
                    <h5 className="text-center bg-dark text-white p-2">Movies Review</h5>
                    {movie.result.review.map((review) => (
                        <ReviewMovie review={review.review} id={id} />
                    ))}

                    {/*  HANDLE NO REVIEW */}
                    {movie.result.review.length === 0 && (
                        <Alert className="p-2" variant="info">
                            There is no review currently for this movie !
                        </Alert>
                    )}
                    {/* HANDLING REVIEW */}
                    {auth && (
                        <Form onSubmit={sendReveiw}>
                            <Form.Group className="mb-3">
                                <textarea
                                    value={review.review}
                                    onChange={(e) => setReview({ ...review, review: e.target.value })}
                                    className="form-control"
                                    placeholder="please write a review"
                                    rows={5}></textarea>
                            </Form.Group>
                            <Form.Group>
                                <button className="btn btn-dark">
                                    Send Review
                                </button>
                            </Form.Group>

                        </Form>
                    )}
                </>
            )}

            {/* ERRORS HANDLING */}
            {movie.loading === false && movie.err != null && (
                <Alert className="p-2" variant="danger">
                    {movie.err}
                </Alert>
            )}

            {/*  HANDLE  REVIEW */}
            {!auth && (
                <Alert className="p-2" variant="warning">
                    please login first to be able to send review !
                </Alert>
            )}

        </div>
    );
}

export default MovieDetails;