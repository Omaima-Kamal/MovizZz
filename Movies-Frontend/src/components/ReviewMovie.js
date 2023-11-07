import "../css/ReviewMovies.css";

const ReviewMovie = (props) => {
    return (
        <div className="review-container p-4">
             <p>{props.review}</p>         
        </div>
    );
}

export default ReviewMovie;