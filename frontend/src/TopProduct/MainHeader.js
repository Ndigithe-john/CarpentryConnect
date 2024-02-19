import office from "../assets/office.jpg";
import bed from "../assets/bed.jpg";
import dining from "../assets/dining.jpg";

const MainHeader = () => {
  return (
    <div>
      <div className="banner1">
        <img src={office} alt="officeFurniture" className="banner_images" />
        <div className="text-box">
          <h1>Transform Your Workspace</h1>
          <span></span>
          <p>
            Discover the best in office furniture installation for a productive
            and stylish environment.
          </p>
        </div>
      </div>
      <div className="banner2">
        <img src={bed} alt="bedFurniture" className="banner_images" />
        <div className="text-box">
          <h1>Elevate Your Comfort</h1>
          <span></span>
          <p>
            Explore high-quality beds that provide the perfect blend of comfort
            and aesthetics for a good night's sleep.
          </p>
        </div>
      </div>
      <div className="banner3">
        <img src={dining} alt="dining" className="banner_images" />
        <div className="text-box">
          <h1>Dine in Style</h1>
          <span></span>
          <p>
            Discover exquisite dining tables and associated furniture pieces to
            create a stylish dining experience at home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
