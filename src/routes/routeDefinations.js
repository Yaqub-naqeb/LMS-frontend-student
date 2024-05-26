const routes = {
  login: {
    path: "/login",
  },
  signup: {
    path: "/signup",
  },
  root: {
    path: "/",
  },
  profile: {
    path: "/profile",
  },
  books: {
    path: "/books",
    bookPage: {
      path: "/books/:bookId",
    },
  },
  bookings: {
    path: "/bookings",
  },
};
export default routes;
