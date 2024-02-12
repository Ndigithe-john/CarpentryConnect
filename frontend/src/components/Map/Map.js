import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import placeholder from "../../assets/placeholder.png";
import L from "leaflet";

const defaultPosition = [-0.397037, 36.9648429];

const icon = L.icon({
  iconUrl: placeholder,
  iconSize: [30, 30],
});

function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition]);

  return null;
}

function Map({ selectPosition, setSelectPosition }) {
  const [clickedPosition, setClickedPosition] = useState(null);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    const newSelectPosition = { lat, lon: lng };

    setClickedPosition(newSelectPosition);

    setSelectPosition(newSelectPosition);
  };

  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const clickedMarkerPosition = clickedPosition
    ? [clickedPosition.lat, clickedPosition.lon]
    : null;

  const mapStyle = {
    height: "100%",
    width: "100%",
    cursor: "pointer",
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={false}
      style={mapStyle}
      onClick={handleMapClick}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=42vvAXIkwZlX6Xb8zY3B"
      />

      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            Selected position. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}

      {clickedPosition && (
        <Marker position={clickedMarkerPosition} icon={icon}>
          <Popup>
            You clicked here. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}

      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}

export default Map;