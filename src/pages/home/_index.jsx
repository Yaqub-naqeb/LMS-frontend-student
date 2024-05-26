import { NavLink } from "react-router-dom";
import koyaImg from "../../assets/KoyaUni.png";
import HomeButton from "../../components/buttons/HomeButton";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <div className="content">
        <h1>
          {t("title")}
        </h1>
        {/* <p>
          Empower your learning.
          <p>Visit the Koya University Library today!</p>
        </p> */}
      </div>
      <div>
        <img className="image-container" src={koyaImg} alt="koya university" />
      </div>
      <NavLink to={"/books"} className={"link"}>
        <HomeButton name={t("button")} />
      </NavLink>
    </div>
  );
};

export default Home;

