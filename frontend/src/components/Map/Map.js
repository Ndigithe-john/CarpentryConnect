import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultPosition = [-0.397037, 36.9648429];
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapEventHandlers({ setWorkshopLocation }) {
  const map = useMap();

  useEffect(() => {
    const handleClick = async (e) => {
      if (e.latlng) {
        const { lat, lng } = e.latlng;

        // Reverse geocoding to get the name of the place
        const placeName = await getPlaceName(lat, lng);

        const confirmSetLocation = window.confirm(
          `Do you want to set your workshop location at ${placeName}?`
        );

        if (confirmSetLocation) {
          setWorkshopLocation({
            latitude: lat,
            longitude: lng,
            placeName: placeName,
          });

          // Add a blue marker at the clicked location
          L.marker([lat, lng], { icon: blueIcon }).addTo(map);
          map.flyTo(e.latlng, map.getZoom());
        }
      }
    };

    const handleLocationFound = async (e) => {
      const { lat, lng } = e.latlng;

      // Reverse geocoding to get the name of the place
      const placeName = await getPlaceName(lat, lng);

      const confirmSetLocation = window.confirm(
        `Do you want to set your workshop location at ${placeName}?`
      );

      if (confirmSetLocation) {
        setWorkshopLocation({
          latitude: lat,
          longitude: lng,
          placeName: placeName,
        });

        // Add a blue marker at the located position
        L.marker([lat, lng], { icon: blueIcon }).addTo(map);
        map.flyTo(e.latlng, map.getZoom());
      }
    };

    map.on("click", handleClick);
    map.on("locationfound", handleLocationFound);

    return () => {
      map.off("click", handleClick);
      map.off("locationfound", handleLocationFound);
    };
  }, [map, setWorkshopLocation]);

  // Function to get the name of the place using reverse geocoding
  // Function to get the name of the place using reverse geocoding
  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error("Failed to retrieve place name");
      }

      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return `Place at (${latitude}, ${longitude})`;
    }
  };

  return null;
}

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
  }, [selectPosition, map]);

  return null;
}

function Map({ selectPosition, setWorkshopLocation, workshopLocation }) {
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
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
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=42vvAXIkwZlX6Xb8zY3B"
      />

      {selectPosition && (
        <Marker position={locationSelection} icon={redIcon}>
          <Popup>
            Selected position. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}

      <MapEventHandlers setWorkshopLocation={setWorkshopLocation} />
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}

export default Map;
