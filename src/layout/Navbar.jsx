import { useContext } from "react";
import routes from "../routes/routeDefinations";
import { NavLink,useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/context/AuthContext";

const Navbar = () => {
  const { toggleAuth, isAuthenticated } = useContext(AuthContext);
  const navigate=useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    toggleAuth();
    navigate("/login");
  };
  const pages = [
    { id:1,name: "Home", path: routes.root.path },
    { id:2,name: "Books", path: routes.books.path },
    { id:3,name: "Signup", path: routes.signup.path },
    { id:4,name:"Login", path:routes.login.path },
  ];

  const pagesForAuth = [
    { id:1,name: "Home", path: routes.root.path },
    { id:2,name: "Books", path: routes.books.path },
    { id:3,name: "Logout", path: 'not available' },
    { id:4,name:"profile",path:routes.profile.path},
  ];
  



const pg=isAuthenticated?pagesForAuth:pages;




  return (
    <div>
      <nav className="navbar">
        <h1>Koya Unversity</h1>
        <ul className="navbar__list">
          {pg.map((page) => (
            <li key={page.id} className="navbar__item" onClick={page.name==='Logout'?logout:undefined}>
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
