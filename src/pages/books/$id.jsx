import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";

export const BookAction = async ({ request }) => {
  if (request.method !== "POST") return {};

  const formData = await request.formData();

  const formDataObject = Object.fromEntries(formData.entries());
  let response;

  try {
    response = await fetch("http://127.0.0.1:8000/api/booking/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        booking_date: null,
        deadline_date: null,
        user: {
          id: formDataObject.userId,
        },
        book: {
          id: formDataObject.bookId,
        },
        isPending: true,
      }),
    });

    if (response.ok) {
      response = await response.json();
    }
  } catch (err) {
    console.log("we have an error");
  }

  return response;
};

export const BookLoader = async ({ params }) => {
  let bookData = {};
  let bookingData = {};
  const userId = localStorage.getItem("userId");
  try {
    bookData = await gettingBooks(
      `http://127.0.0.1:8000/api/books/${params.id}?page_size=10000`
    );

    if (userId) {
      bookingData = await gettingBooks(
        `http://127.0.0.1:8000/api/booking?book_id=${params.id}`
      );
    }
  } catch (err) {
    console.log(err);
  }

  return { bookData, bookingData };
};

const BookDetail = () => {
  const submit = useSubmit();
  const { bookData, bookingData } = useLoaderData();
  const userId = localStorage.getItem("userId");

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
            action: ".",
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
                  bookingData[0]?.isPending || bookingData[0]?.isBooked
                    ? "btnn"
                    : ""
                } `}
                onClick={submitHandler}
                disabled={bookingData[0]?.isPending || bookingData[0]?.isBooked}
              >
                {bookingData[0]?.isPending
                  ? "Pending"
                  : bookingData[0]?.isBooked
                  ? "Reserved"
                  : "Reservation"}
              </button>

              {bookingData[0]?.isBooked &&
                bookingData[0]?.user?.id == userId && (
                  <p>This book is Reserved by you </p>
                )}
              {bookingData[0]?.isBooked &&
                bookingData[0]?.user?.id != userId && (
                  <p>Sorry, This book is Reserved by another student </p>
                )}

              {bookingData[0]?.isPending &&
                bookingData[0]?.user?.id == userId && (
                  <p>Your request sent to admin for approval. Thank you.</p>
                )}
              {bookingData[0]?.isPending &&
                bookingData[0]?.user?.id != userId && (
                  <p>Sorry, this book is requested by another student.</p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
