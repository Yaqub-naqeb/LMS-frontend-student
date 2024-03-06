// eslint-disable-next-line react/prop-types
const BookCard = ({ cover_image, title }) => {
  return (
    <div className="book-card">
      <div className="book-card__inner">

<div className="book-card__image-container">         <img className="book-card__image" src={`http://127.0.0.1:8000${cover_image}`} alt="Book Cover" />
</div>


        <h2 className="book-card__title">{title}</h2>
      </div>
    </div>
  );
};

export default BookCard;
