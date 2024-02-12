import { useState } from "react";
import Map from "./Map";
import SearchBox from "./SearchBox";
import "./mapstyles.css";

const Maps = () => {
  const [selectPosition, setSelectPosition] = useState(null);
  console.log(selectPosition);
  return (
    <div className="map_container">
      <div className="map_box">
        <Map selectPosition={selectPosition} />
      </div>
      <div className="search_box ">
        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
    </div>
  );
};

export default Maps;

//allowing cors getting some server time

// https://cors-anywhere.herokuapp.com/corsdemo
