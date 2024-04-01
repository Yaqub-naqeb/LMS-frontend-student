import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";

export const BookLoader = async ({ params }) => {
  let bookData = {};
  let bookingData = {};
  const userId = localStorage.getItem("userId");
  try {
    bookData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/${params.id}?page_size=10000`
    );

if(userId){
   bookingData = await gettingBooks(
      `http://127.0.0.1:8000/api/booking?is_user=${userId}&&book_id=${params.id}`
    );}
  } catch (err) {
    console.log(err);
  }

  return { bookData, bookingData };
};

const BookDetail = () => {
  const submit = useSubmit();
  const { bookData, bookingData } = useLoaderData();

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
      <div className="bg"> </div>
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
                <span className="book-detail__text__authorr">
                  {bookData.author}
                </span>
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Genre: </span>{" "}
                <span className="book-detail__text__authorr">
                  {" "}
                  {bookData.genre}
                </span>
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Status: </span>{" "}
                <span className="book-detail__text__authorr">
                  {bookData.isBooked ? "Unavailable" : "Available"}
                </span>
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Page Number: </span>{" "}
                <span className="book-detail__text__authorr">
                  {bookData.page_number}
                </span>
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Page Code: </span>{" "}
                <span className="book-detail__text__authorr">
                  {" "}
                  {bookData.book_code}
                </span>
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">
                  Published Place:
                </span>{" "}
                <span className="book-detail__text__authorr">
                  {bookData.published_place}
                </span>
              </p>
              <p className="book-detail__text">
                <span className="book-detail__text__label">Publisher:</span>{" "}
                <span className="book-detail__text__authorr">
                  {bookData.publisher}
                </span>
              </p>

              <p className="book-detail__text">
                <span className="book-detail__text__label">Publish Date:</span>{" "}
                <span className="book-detail__text__authorr">
                  {" "}
                  {bookData.publication_date}
                </span>
              </p>
            </div>
            <div className="book-detail__button">
              <button
                type="button"
                className={`book-detail__button__btn ${
                  bookingData[0]?.isPending ? "btnn" : ""
                } `}
                onClick={submitHandler}
                disabled={bookingData[0]?.isPending}
              >
                {bookingData[0]?.isPending ? "Peding" : "Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
