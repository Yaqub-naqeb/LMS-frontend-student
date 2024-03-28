import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";

export const BookLoader = async ({ params }) => {
  let bookData = {};
  try {
    bookData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/${params.id}?page_size=10000`
    );
  } catch (err) {
    console.log(err);
  }

  return bookData;
};

const BookDetail = () => {
  const submit = useSubmit();
  const bookData = useLoaderData();
  const navigate = useNavigate();
  const submitHandler = () => {
    const userId = localStorage.getItem("userId");

    userId
      ? submit(
          {
            userId: userId,
            bookId: bookData.id,
          },
          {
            method: "POST",
            action: "/books",
          }
        )
      : navigate("/login");
  };

  return (
    <div className="book-detail">
      {bookData && (
        <div className="book-detail__container">
          <div className="book-detail__image">
            <img src={bookData.cover_image} alt="Book cover" />
          </div>
          <div className="book-detail__info">
            <h2 className="book-detail__title">{bookData.title}</h2>
            {/* text */}
            <div className="details">
              <p className="book-detail__text">
                <span className="book-detail__text__label">Author:</span>{" "}
                {bookData.author}
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Genre:</span>{" "}
                {bookData.genre}
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Status:</span>{" "}
                {bookData.isBooked ? "Unavailable" : "Available"}
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Page Number: </span>{" "}
                {bookData.page_number}
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Page Code: </span>{" "}
                {bookData.book_code}
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">
                  Published Place:
                </span>{" "}
                {bookData.published_place}
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Publisher:</span>{" "}
                {bookData.publisher}
              </p>

              <p className="book-detail__text">
                <span className="book-detail__text__label">Publish Date:</span>{" "}
                {bookData.publication_date}
              </p>
            </div>
            <div className="book-detail__button">
              <button
                type="button"
                className="book-detail__button__btn"
                onClick={submitHandler}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
