import routes from "../routes/routeDefinations";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const pages = [
    { name: "Home", path: routes.root.path },
    { name: "Books", path: routes.books.path },
    { name: "Signup", path: routes.signup.path },
    { name: "Login", path: routes.login.path },
  ];
  return (
    <div>
      <nav className="navbar">
        <h1>Koya Unversity</h1>
        <ul className="navbar__list">
          {pages.map((page) => (
            <li key={page.name} className="navbar__item">
              <NavLink
                to={page.path}
                activeClassName="active"
                className={page.name === "Login" ? "login" : "navbar__link"}
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
