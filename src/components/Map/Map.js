import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import API_KEY from "./config";
const containerStyle = {
  width: "400px",
  height: "350px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
