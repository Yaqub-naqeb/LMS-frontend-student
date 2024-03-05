// eslint-disable-next-line react/prop-types
const BookCard = ({ cover_image, title }) => {
  return (
    <div className="book-card">
      <div className="book-card__inner">
        <img className="book-card__image" src={cover_image} alt={title} />
        <h2 className="book-card__title">{title}</h2>
      </div>
    </div>
  );
};

export default BookCard;
