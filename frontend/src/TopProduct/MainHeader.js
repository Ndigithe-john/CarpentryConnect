import office from "../assets/office.jpg";
const MainHeader = () => {
  return (
    <div>
      <div className="banner1">
        <img src={office} alt="officeFurniture" className="banner_images" />
        <div className="text-box">
          <h1>Office Furniture</h1>
          <p>The best dealers in office furniture installaion.</p>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
