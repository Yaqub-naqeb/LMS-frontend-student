import { useContext, useState } from "react";
import routes from "../routes/routeDefinations";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/context/AuthContext";
import { Turn as Hamburger } from "hamburger-react";
const Navbar = () => {
  const { toggleAuth, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isBookRoute = location.pathname.match(/^\/books\/\d+$/);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    toggleAuth();
    navigate("/login");
  };
  const pages = [
    { id: 1, name: "Home", path: routes.root.path },
    { id: 2, name: "Books", path: routes.books.path },
    { id: 3, name: "Sign Up", path: routes.signup.path },

    { id: 4, name: "Login", path: routes.login.path },
  ];

  const pagesForAuth = [
    { id: 1, name: "Home", path: routes.root.path },
    { id: 2, name: "Books", path: routes.books.path },
    { id: 3, name: "Bookings", path: routes.bookings.path },

    { id: 4, name: "Logout", path: "not available" },
    { id: 5, name: "profile", path: routes.profile.path },
  ];

  const pg = isAuthenticated ? pagesForAuth : pages;

  return (
    <div>
      <nav
        id={`${
          location.pathname === "/login" || location.pathname === "/signup"
            ? "userInAuthh"
            : ""
        }`}
        className={`navbar   ${isBookRoute && "detailPage"} `}
      >
        <div className="navbar__container">
          <h1 className="koyaUni">Koya Unversity</h1>
          <button type="button" className="menu-button" onClick={toggleMenu}>
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
          </button>
        </div>
        <ul className={`navbar__list ${isOpen ? "active" : ""}`}>
          {pg.map((page) => (
            <li
              key={page.id}
              className="navbar__item"
              onClick={page.name === "Logout" ? logout : undefined}
            >
              <NavLink
                to={page.path}
                activeClassName="active"
                className={page.id === 4 ? "login" : "navbar__link"}
              >
                {page.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
