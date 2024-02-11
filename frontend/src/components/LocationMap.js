import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function LocationMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const kenya = { lng: 36.9648429, lat: -0.397037 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "42vvAXIkwZlX6Xb8zY3B";
  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [kenya.lng, kenya.lat],
      zoom: zoom,
    });
  }, [kenya.lng, kenya.lat, zoom]);
  new maptilersdk.Marker({ color: "#FF0000" })
    .setLngLat([36.9648429, -0.397037])
    .addTo(map.current);
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
