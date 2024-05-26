
// import { useContext, useEffect, useState } from "react";
// import routes from "../routes/routeDefinations";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../components/auth/context/AuthContext";
// import { useTranslation } from "react-i18next";
// import { LANGUAGES } from "../constants/languages";

// const Navbar = () => {
//   const { toggleAuth, isAuthenticated } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const isBookRoute = location.pathname.match(/^\/books\/\d+$/);
//   const navigate = useNavigate();
//   const { i18n } = useTranslation();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("access");
//     localStorage.removeItem("username");
//     localStorage.removeItem("userId");

//     toggleAuth();
//     navigate("/login");
//   };

//   const pages = [
//     { id: 1, name: "Home", path: routes.root.path },
//     { id: 2, name: "Books", path: routes.books.path },
//     { id: 3, name: "Sign Up", path: routes.signup.path },
//     { id: 4, name: "Login", path: routes.login.path },
//   ];

//   const pagesForAuth = [
//     { id: 1, name: "Home", path: routes.root.path },
//     { id: 2, name: "Books", path: routes.books.path },
//     { id: 3, name: "My Bookings", path: routes.bookings.path },
//     { id: 4, name: "Logout", path: "not available" },
//     { id: 5, name: "Profile", path: routes.profile.path },
//   ];

//   const pg = isAuthenticated ? pagesForAuth : pages;

//   const onChangeLang = (e) => {
//     const lang_code = e.target.value;
//     const dir = lang_code === 'ku' ? 'rtl' : 'ltr';
//     document.documentElement.dir = dir;
//     document.documentElement.classList.toggle('rtl', dir === 'rtl');
//     i18n.changeLanguage(lang_code);
//   };
  



//   return (
//     <div>
//       <nav
//         id={`${
//           location.pathname === "/login" || location.pathname === "/signup"
//             ? "userInAuthh"
//             : ""
//         }`}
//         className={`navbar ${isBookRoute ? "detailPage" : location.pathname === "/profile" ? 'profilePage' : ''}`}
//       >
//         <div className="navbar__container">
//           <h1 className="koyaUni">Koya University</h1>
//           <button type="button" className="menu-button" onClick={toggleMenu}>
//             {/* <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} /> */}
//           </button>
//         </div>
//         <ul className={`navbar__list ${isOpen ? "active" : ""}`}>
//           {pg.map((page) => (
//             <li
//               key={page.id}
//               className="navbar__item"
//               onClick={page.name === "Logout" ? logout : undefined}
//             >
//               <NavLink
//                 to={page.path}
//                 activeClassName="active"
//                 className={page.id === 4 ? "login" : "navbar__link"}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {page.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//         <select defaultValue={i18n.language} onChange={onChangeLang} className='multi-lang'>
//           {LANGUAGES.map(({ code, label }) => (
//             <option key={code} value={code}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;



import { useContext, useEffect, useState } from "react";
import routes from "../routes/routeDefinations";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/context/AuthContext";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants/languages";

const Navbar = () => {
  const { toggleAuth, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isBookRoute = location.pathname.match(/^\/books\/\d+$/);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { t } = useTranslation();


  useEffect(() => {
    // Set the initial direction based on the current language
    const initialLang = i18n.language;
    const initialDir = initialLang === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.dir = initialDir;
    document.documentElement.classList.toggle('rtl', initialDir === 'rtl');
  }, [i18n.language]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    { id: 3, name: "My Bookings", path: routes.bookings.path },
    { id: 4, name: "Logout", path: "not available" },
    { id: 5, name: "Profile", path: routes.profile.path },
  ];

  const pg = isAuthenticated ? pagesForAuth : pages;

  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    const dir = lang_code === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.classList.toggle('rtl', dir === 'rtl');
    i18n.changeLanguage(lang_code);
  };

  return (
    <div>
      <nav
        id={`${
          location.pathname === "/login" || location.pathname === "/signup"
            ? "userInAuthh"
            : ""
        }`}
        className={`navbar ${isBookRoute ? "detailPage" : location.pathname === "/profile" ? 'profilePage' : ''}`}
      >
        <div className="navbar__container">
          <h1 className="koyaUni">{t("uni")}</h1>
          <button type="button" className="menu-button" onClick={toggleMenu}>
            {/* <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} /> */}
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
                onClick={() => setIsOpen(false)}
              >
                {page.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <select defaultValue={i18n.language} onChange={onChangeLang} className='multi-lang'>
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </nav>
    </div>
  );
};

export default Navbar;
