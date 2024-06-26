import ErrorPage from "../pages/Error";
import routes from "./routeDefinations";
import Root from "../pages/Root";
import Books from "../pages/books/_index";
import Book, { BookLoader,BookAction } from "../pages/books/$id";
import Home from "../pages/home/_index";
import Login, { loginAction } from "../pages/login/_index";
import Signup, { signupAction } from "../pages/signup/_index";
import { booksLoader } from "../pages/books/_index";
import UnAuth from "../components/auth/UnAuth";
import Protected from '../components/auth/Protected'
import Bookings, { bookingLoader } from "../pages/bookings/_index";
import Profile from "../pages/profile/_index";
const routesConfig = [
  {
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        path: routes.root.path,
        element: <Home />,
      },
      {
        path: routes.books.path,
        element: <Books />,
        loader: booksLoader,
        
      },
      {
        path: "/books/:id",
        element: <Book />,
        loader: BookLoader,
        action: BookAction,
      },
      {
        path: routes.login.path,
        element: (
          <UnAuth>
            <Login />
          </UnAuth>
        ),
        action: loginAction,
      },
      {
        path: routes.signup.path,
        element: (
          <UnAuth>
            <Signup />
          </UnAuth>
        ),
        action: signupAction,
      },
      {
        path: routes.bookings.path,

        element: (
          <Protected>
            <Bookings />
          </Protected>
        ),
        loader: bookingLoader,
      },
      {
        path:routes.profile.path,
        element: (
          <Protected>
            <Profile/>
          </Protected>
        )
      }
    ],
  },
];

export default routesConfig;
