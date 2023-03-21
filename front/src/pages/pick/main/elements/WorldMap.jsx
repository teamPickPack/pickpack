import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = () => {
  const position = [51.505, -0.09];
  return (
    <>
      <MapContainer center={position} zoom={2} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>팝업</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default WorldMap;
