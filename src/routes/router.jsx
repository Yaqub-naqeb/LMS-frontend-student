import ErrorPage from "../pages/Error";
import routes from "./routeDefinations";
import Root from "../pages/Root";
import Books from "../pages/books/_index";
import Book, { BookLoader } from '../pages/books/$id'
import Home from "../pages/home/_index";
import Login, { loginAction } from "../pages/login/_index";
import Signup, { signupAction } from "../pages/signup/_index";
import { booksLoader } from "../pages/books/_index";
import UnAuth from "../components/auth/UnAuth";
const routesConfig = [
  {
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        path: routes.root.path,
        element:<Home />
      },
      {
        path: routes.books.path,
        element: (
          
            <Books />
       
        ),
        loader: booksLoader,
      },{
        path:'/books/:id',
        element:(<Book/>),
        loader: BookLoader,
      }
      ,{
        path: routes.login.path,
        element:(
        <UnAuth>
        <Login/>
        </UnAuth>),
        action:loginAction
      },
      {
        path: routes.signup.path,
        element:(
          <UnAuth>
            <Signup/>
          </UnAuth>
        ),
        action:signupAction,
      },
    ],
  },
];

export default routesConfig;
