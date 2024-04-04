import { NavLink, useLoaderData, useRevalidator } from "react-router-dom";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";
import deleteBook from "../../api/DataFetcher/delete/deleteBook";
export const bookingLoader = async ({ request }) => {
  let bookingData = {};
  const userId = localStorage.getItem("userId");
  try {
    bookingData = await gettingBooks(
      `http://127.0.0.1:8000/api/booking?user_id=${userId}`
    );
  } catch (err) {
    console.log(err);
  }
  return bookingData;
};

const Bookings = () => {
  const bookingData = useLoaderData();
  const revalidator = useRevalidator();

  const calculateRemainingDays = (booking) => {
    const currentDate = new Date();
    const deadlineDate = new Date(booking.deadline_date);
    const remainingTime = deadlineDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));
    return remainingDays;
  };

  const handleDelete = async (requestedBookId) => {
    await deleteBook(`http://127.0.0.1:8000/api/booking/${requestedBookId}`);
    revalidator.revalidate();
  };

  return (
    <div className={"containerr"}>
      <h2 className="booking-header">Your Book Requests</h2>

      {bookingData.length !== 0 ? (
        <div className="booking-container">
          {bookingData.map((booking) => (
            <div key={booking.id} className="booking-card">
              <img
                src={`http://127.0.0.1:8000/${booking.book.cover_image}`}
                alt={booking.book.title}
                className="booking-cover"
              />
              <div className="booking-details">
                <h3>{booking.book.title}</h3>
                <p>by {booking.book.author}</p>
                <div className="booking-status">
                  <i
                    className={`fas fa-clock ${
                      booking.isPending ? "pending" : "booked"
                    }`}
                  />
                  <span>
                    Status: {booking.isPending ? "Pending" : "Booked"}
                  </span>
                </div>

                {booking.isPending && (
                  <button
                    type="button"
                    className="reject-button"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Reject
                  </button>
                )}
              </div>
              {booking.isBooked && (
                <div className="booked-cont">
                  <p>
                    {" "}
                    booking date:{" "}
                    <span className="date">{booking.booking_date}</span>
                  </p>
                  <p>
                    {" "}
                    deadline date:{" "}
                    <span className="date">{booking.deadline_date}</span>
                  </p>

                  <p
                    className={`remaining-day ${
                      calculateRemainingDays(booking) == 1 ? "expired" : ""
                    } `}
                  >
                    <span className="remaining-day-number">
                      {calculateRemainingDays(booking)}{" "}
                      {calculateRemainingDays(booking) === 1 ? "day" : "days"}
                    </span>{" "}
                    left to return the book.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-bookings">
          <p className="no-bookings-message">
            You haven&apos;t requested any books yet.
            <br />
            Start browsing and discover something new!
          </p>
          <NavLink to={"/books"}>
            {" "}
            <button type="button" className="explore-button">
              Explore Books
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Bookings;
