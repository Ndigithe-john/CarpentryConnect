// LocationMap.js
import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const LocationMap = ({ onLocationSelect }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const kenya = { lng: 36.9648429, lat: -0.397037 };
  const [zoom] = useState(14);

  useEffect(() => {
    if (!mapContainer.current) return;

    maptilersdk.accessToken = `42vvAXIkwZlX6Xb8zY3B`;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [kenya.lng, kenya.lat],
      zoom: zoom,
    });

    map.current.getCanvas().style.cursor = "pointer";

    map.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      const placeName = data.display_name;

      const confirmLocation = window.confirm(
        `Do you want to set the location as ${placeName}?`
      );

      if (confirmLocation) {
        if (marker.current) {
          marker.current.remove();
        }

        marker.current = new maptilersdk.Marker({
          color: "#FF0000",
          draggable: true,
        })
          .setLngLat([lng, lat])
          .addTo(map.current);

        marker.current.on("dragend", (event) => {
          const { lng, lat } = event.target.getLngLat();
          onLocationSelect({ lng, lat });
        });

        onLocationSelect({ lng, lat });
      }
    });

    marker.current = new maptilersdk.Marker({
      color: "#FF0000",
      draggable: true,
    })
      .setLngLat([kenya.lng, kenya.lat])
      .addTo(map.current);

    marker.current.on("dragend", (event) => {
      const { lng, lat } = event.target.getLngLat();
      onLocationSelect({ lng, lat });
    });
  }, [kenya.lng, kenya.lat, zoom, onLocationSelect]);

  return (
    <div className="map-wrap">
      <div
        ref={mapContainer}
        className="map"
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
};

export default LocationMap;
