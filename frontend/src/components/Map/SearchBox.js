import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import placeholder from "../../assets/placeholder.png";

const NOMINATIM_BASE_URL = `https://nominatim.openstreetmap.org/search?`;

const SearchBox = ({ selectPosition, setSelectPosition }) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `${NOMINATIM_BASE_URL}${queryString}`;

    const corsAnywhereUrl = `https://cors-anywhere.herokuapp.com/${apiUrl}`;

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(corsAnywhereUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Results:", result);
        setListPlace(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="search_container">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem button onClick={() => setSelectPosition(item)}>
                  <ListItemIcon>
                    <img
                      src={placeholder}
                      alt="placeholder"
                      style={{ width: 30, height: 30 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default SearchBox;
