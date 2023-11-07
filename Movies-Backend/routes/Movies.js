const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize")
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// ADMIN
// CREATE MOVIE
router.post(
    "",
    admin,
    upload.single("image"),
    body("name")
        .isString()
        .withMessage("please enter a valid movie name"),

    body("description")
        .isString()
        .withMessage("please enter a valid description")
        .isLength({ min: 20 })
        .withMessage("Description should be at least 20 characters"),

    async (req, res) => {
        try {
            // 1- VALIDATION REQUEST [manual, express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- VALIDATE THE IMAGE
            if (!req.file) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Image is required !",
                        },
                    ],
                });
            }

            // 3- PREPARE MOVIE OBJECT
            const movie = {
                name: req.body.name,
                description: req.body.description,
                image_url: req.file.filename,
            }

            // 4- INSERT MOVIE OBJECT
            const query = util.promisify(conn.query).bind(conn);
            await query('insert into movies set ? ', movie);
            res.status(200).json({
                msg: "Movie created successfully !",
            });

        } catch (err) {
            res.status(500).json(err);
        }
    });

// UPDATE MOVIE
router.put(
    "/:id", // params
    admin,
    upload.single("image"),
    body("name")
        .isString()
        .withMessage("please enter a valid movie name"),

    body("description")
        .isString()
        .withMessage("please enter a valid description")
        .isLength({ min: 20 })
        .withMessage("Description should be at least 20 characters"),

    async (req, res) => {
        try {
            // 1- VALIDATION REQUEST [manual, express validation]
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- CHECK IF MOVIE EXISTS OR NOT  
            const movie = await query("select * from movies where id = ? ", [
                req.params.id,
            ]);
            if (!movie[0]) {
                res.status(404).json({ msg: "Movie not found !" });
            } else {

                // 3- PREPARE MOVIE OBJECT
                const movieObj = {
                    name: req.body.name,
                    description: req.body.description,
                }
                if (req.file) {
                    movieObj.image_url = req.file.filename;
                    fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image

                }

                // 4- UPDATE MOVIE OBJECT
                await query('update movies set ? where id = ? ', [
                    movieObj,
                    movie[0].id
                ]);
                res.status(200).json({
                    msg: "Movie updated successfully !",
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

// DELETE MOVIE
router.delete(
    "/:id", // params
    admin,
    async (req, res) => {
        try {
            // 1- CHECK IF MOVIE EXISTS OR NOT 
            const query = util.promisify(conn.query).bind(conn);
            const movie = await query("select * from movies where id = ? ", [
                req.params.id,
            ]);
            if (!movie[0]) {
                res.status(404).json({ msg: "Movie not found !" });
            }
            else {
                // 2- REMOVE MOVIE IMAGE                
                fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
                await query('delete from movies where id = ? ', [movie[0].id]);
                res.status(200).json({
                    msg: "Movie deleted successfully !",
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    });


// LIST & SEARCH [AMIN, USER]
router.get("", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    if (req.query.search) {
        // QUERY PARAMS
        search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
    }
    const movies = await query(`select * from movies ${search}`);
    movies.map((movie) => {
        movie.image_url = "http://" + req.host + ":4000/" + movie.image_url;
    });
    res.status(200).json(movies);
});

// SHOW MOVIE [AMIN, USER]
router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const movie = await query("select * from movies where id = ? ", [req.params.id]);
    if (!movie[0]) {
        res.status(404).json({ msg: "Movie not found !" });
    } else {
        movie[0].image_url = "http://" + req.hostname + ":4000/" + movie[0].image_url;
       movie[0].review = await query(
        "select * from movie_review where movie_id = ? ",
       movie[0].id
       );
        res.status(200).json(movie[0]);
    }
});

// MAKE REVIEW
router.post(
    "/review",
    body("movie_id").isNumeric().withMessage("p;ease enter a valid movie ID"),
    body("review").isString().withMessage("p;ease enter a valid Review"),
    authorized,
    async (req, res) => {
        try {
            // 1- VALIDATION REQUEST [manual, express validation]
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- CHECK IF MOVIE EXISTS OR NOT  
            const movie = await query("select * from movies where id = ? ", [
                req.body.movie_id,
            ]);
            if (!movie[0]) {
                res.status(404).json({ msg: "Movie not found !" });
            } else {

                // 3- PREPARE MOVIE REVIEW OBJECT
                const reviewObj = {
                    user_id: res.locals.user.id,
                    movie_id: movie[0].id,
                    review: req.body.review,
                };

                // - INSERT REVIEW OBJECT INTO DATABASE
                await query("insert into movie_review set ?", reviewObj);

                res.status(200).json({
                    msg: "Review added successfully !",
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    });

module.exports = router;