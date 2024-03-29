import PropTypes from "prop-types";
const BookCard = ({ cover_image, title, data }) => {
  return (
    <div className="book-card">
      <div className="book-card__inner">
        <div className="book-card__image-container">
          {" "}
          <img
            className="book-card__image"
            src={`http://127.0.0.1:8000${cover_image}`}
            alt="Book Cover"
          />
        </div>

        <div className="book-card__cont">
          <h2 className="book-card__title">{title}</h2>
          <p className="book-card__author">{data.author}</p>

          <div className="fl">
            <p className="book-card__author">
              {data.is_booked ? "Booked" : "not Booked"}
            </p>

            <p className="book-card__date">{data.publication_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  cover_image: PropTypes.string.isRequired,
};
