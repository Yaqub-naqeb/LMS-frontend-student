import koyaImg from "../../assets/KoyaUni.png";
import HomeButton from "../../components/buttons/HomeButton";

const Home = () => {
  return (
    <div className="home">
      <div className="content">
      <h1>
        Reserve books online:
       <p>  Find and hold your books quickly and easily.</p>
      </h1>
      <p>Empower your learning. 
        <p>Visit the Koya University Library today!</p>
      </p>
      </div>
      <div>
        <img className="image-container" src={koyaImg} alt="koya university" />
      </div>
      <div>
        <HomeButton name={'Explore Books'}/>
      </div>
    </div>
  );
};

export default Home;
