import { NavLink, useLoaderData } from "react-router-dom";
import { gettingBooks } from "../../api/DataFetcher/BookFetcher";
export const bookingLoader = async ({ request }) => {
  let bookingData = {};
  try {
    bookingData = await gettingBooks("http://127.0.0.1:8000/api/booking");
  } catch (err) {
    console.log(err);
  }
  return bookingData;
};

const Bookings = () => {
  const bookingData = useLoaderData();

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
                  <button type="button" className="reject-button">
                    Reject
                  </button>
                )}
              </div>
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
