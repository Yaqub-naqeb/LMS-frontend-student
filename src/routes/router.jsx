import ErrorPage from "../pages/Error";
import routes from "./routeDefinations";
import Root from "../pages/Root";
import Books from "../pages/books/_index";
import Home from "../pages/home/_index";
import Login from "../pages/login/_index";
import Signup from "../pages/signup/_index";

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
        // loader: booksLoader,
      }
      
      ,{
        path: routes.login.path,
        element:<Login/>
      },
      {
        path: routes.signup.path,
        element:<Signup/>
      },
      // {
      //   path: routes.staff.path,
      //   element:<Staff />
      // },

      // {
      //   path: routes.login.path,
      //   element: (
      //     <UnAuth>
      //       <Login />
      //     </UnAuth>
      //   ),
      //   action: loginAction,
      // },
      // {
      //   path: routes.signup.path,
      //   element: (
      //     <UnAuth>
      //       <Signup />
      //     </UnAuth>
      //   ),
      //   action: signupAction,
      // },
    ],
  },
];

export default routesConfig;
