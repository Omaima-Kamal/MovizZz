import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import { getAuthUser } from "../../helper/Storage";

const AddMovies = () => {
    const auth = getAuthUser();
    const [movie, setMovie] = useState({
        name: '',
        description: '',
        loading: false,
        err: '',
        succesMessage: null,
    });

    const image = useRef(null);

    const createMovie = (e) => {
        e.preventDefault();
        setMovie({ ...movie, loading: true });

        const formData = new FormData();
        formData.append("name", movie.name);
        formData.append("description", movie.description);
        if (image.current.files && image.current.files[0]) {
            formData.append("image", image.current.files[0]);
        }
        axios
            .post("http://localhost:4000/movies", formData, {
                headers: {
                    token: auth[0].token,
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((resp) => {
                setMovie({
                    name: '',
                    description: '',
                    loading: false,
                    err: null,
                    succesMessage: "Movie created successfully !",
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
    return (
        <div className="login-container">
            <h1 style = {{
                color: "white",
                marginBottom: "30px",
        }}>
            Add New Movie Form
            </h1>
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

            <Form onSubmit={createMovie}>
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
                        required
                        rows={5}
                        value={movie.description}
                        onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                    ></textarea>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="file" className="form-control" ref={image} required />
                </Form.Group>
                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Add New Movie
                </Button>
            </Form>
        </div>
    );
};

export default AddMovies;