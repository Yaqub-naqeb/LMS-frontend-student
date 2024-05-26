
// export const profileLoader = async ({ request }) => {
  
//   let usersData = {};
//   try {  
//     usersData = await gettingBooks(
//       `http://127.0.0.1:8000/api/books/?${searchBy ? searchBy : "?"}=${
//         searchValue
//           ? searchValue
//           : `&page_size=8&page=${
//               currentPage ? currentPage : 1
//             }&is_booked=${booking}&genre=${genre ? genre : ""}`
//       }`
//     );
//   } catch (err) {
//     console.log(err);
//   }

//   return usersData;
// };




import { gettingBooks } from "../../api/DataFetcher/BookFetcher";
import ProfileImage from "../../assets/istockphoto-1337144146-612x612.jpg";
const Profile = () => {
  return (
    <div className="profile">
      <div className="left">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={ProfileImage}
            alt="user profile"
          />
          <p className="profile__username">Abdulbari</p>
        </div>
      </div>
      <div className="empty"> </div>

      <div className="profile__details">
        <h1 className="profile__title">Profile Detail</h1>

        <div className="profile__info">
          <div>
            <p className="profile__info-item">
              Full Name: <span className="user-detail">Abdulbari Qaisar</span>
            </p>
            <p className="profile__info-item">
              Username: <span className="user-detail">Barri</span>
            </p>
            <p className="profile__info-item">
              Email:{" "}
              <span className="user-detail"> Abdulbari.098765@gamil.com</span>
            </p>
          </div>

          <div>
            <p className="profile__info-item">
              User ID: <span className="user-detail">33</span>
            </p>
            <p className="profile__info-item">
              Number of Pending Books: <span className="user-detail">5</span>
            </p>
            <p className="profile__info-item">
              Number of Booked Books: <span className="user-detail">15</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
