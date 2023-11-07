import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";

const UpdateMovies = () => {
    let { id } = useParams();
    const auth = getAuthUser();
    const [movie, setMovie] = useState({
        name: '',
        description: '',
        image_url: null,
        loading: false,
        err: '',
        succesMessage: null,
        reload: false,
    });
    const image = useRef(null);

    const updateeMovie = (e) => {
        e.preventDefault();
        setMovie({ ...movie, loading: true });

        const formData = new FormData();
        formData.append("name", movie.name);
        formData.append("description", movie.description);
        if (image.current.files && image.current.files[0]) {
            formData.append("image", image.current.files[0]);
        }
        axios
            .put("http://localhost:4000/movies/" + id, formData, {
                headers: {
                    token: auth[0].token,
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((resp) => {
                setMovie({
                    ...movie,
                    loading: false,
                    err: null,
                    succesMessage: "Movie updated successfully !",
                    reload: movie.reload + 1,
                });
                image.current.value = null;
            })
            .catch((err) => {
                setMovie({
                    ...movie,
                    loading: false,
                    succesMessage: null,
                    err: "Something went wrong, please try again later !"
                });
            }
            )
    }

    useEffect(() => {
        axios
            .get("http://localhost:4000/movies/" + id)
            .then((resp) => {
                setMovie({
                    name: resp.data.name,
                    description: resp.data.description,
                    image_url: resp.data.image_url,
                });
                image.current.value = null;
            })
            .catch((err) => {
                setMovie({
                    ...movie,
                    loading: false,
                    succesMessage: null,
                    err: "Something went wrong, please try again later !"
                });
            }
            )
        // eslint-disable-next-line
    }, [movie.reload])
    return (
        <div className="login-container">
            <h1 className="mb-3" style={{
                color: "white",
                marginBottom: "30px",
            }}>Update Movie Form</h1>

            {
                movie.succesMessage && (
                    <Alert className="p-2" variant="success">
                        {movie.succesMessage}
                    </Alert>
                )
            }
            {
                movie.err && (
                    <Alert className="p-2" variant="danger">
                        {movie.err}
                    </Alert>
                )
            }

            <Form onSubmit={updateeMovie} className="text-center p-2">
                <img src={movie.image_url}
                    alt={movie.name}
                    style={{
                        width: "50%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        marginBottom: "10px",
                    }} />
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Movie Name"
                        required
                        value={movie.name}
                        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <textarea
                        placeholder="Description"
                        className="form-control"
                        rows={5}
                        required
                        value={movie.description}
                        onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                    ></textarea>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="file" className="form-control" ref={image} />
                </Form.Group>
                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Update New Movie
                </Button>
            </Form>
        </div>
    );
};

export default UpdateMovies;