import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Continents } from "./continents.js";
import { Africa } from "./Africa.js";
import { Asia } from "./Asia.js";
import { Europe } from "./Europe.js";
import { NorthAmerica } from "./NorthAmerica.js";
import { SouthAmerica } from "./SouthAmerica.js";
import { Oceania } from "./Oceania.js";

const CONTINENT_MAPPER = {
  "North America": NorthAmerica,
  "South America": SouthAmerica,
  Africa: Africa,
  Asia: Asia,
  Europe: Europe,
  Oceania: Oceania,
};

const WorldMap = () => {
  const position = [51.505, -0.09];

  return (
    <>
      <MapContainer center={position} zoom={2} style={{ height: "600px" }}>
        <TileLayer url="https://mt0.google.com/vt/lyrs=m&hl=kr&x={x}&y={y}&z={z}" />
        {/* <MapController /> */}
        <Countries />
      </MapContainer>
    </>
  );
};

// mouse over 시 색상 변경
// zoom 단계에 따라 대륙별 국가별 구분

const Countries = () => {
  const [mapNum, setMapNum] = useState([0, 0]);

  const map = useMapEvents({
    click(e) {
      map.flyTo({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.getZoom();

      updateMapPosition();
    },
    dragend() {
      updateMapPosition();
    },
  });

  const updateMapPosition = () => {
    const center = map.getCenter();
    console.log(Math.round(center.lng / 360));
    const currNum = parseInt(Math.round(center.lng / 360));

    if (mapNum[0] !== currNum) {
      setMapNum([currNum, currNum - mapNum[0]]);
    }
  };

  // useEffect(() => {
  //   map.eachLayer((layer) => {
  //     console.log(layer);
  //     if (layer instanceof L.GeoJSON) {
  //       console.log("remove");
  //       map.removeLayer(layer);
  //     }
  //   });

  //   const target = Continents.features;

  //   for (let i = 0; i < target.length; i++) {
  //     for (let j = 0; j < target[i].geometry.coordinates.length; j++) {
  //       for (let k = 0; k < target[i].geometry.coordinates[j].length; k++) {
  //         for (
  //           let l = 0;
  //           l < target[i].geometry.coordinates[j][k].length;
  //           l++
  //         ) {
  //           Continents.features[i].geometry.coordinates[j][k][l][0] +=
  //             mapNum[1] * 360;
  //         }
  //       }
  //     }
  //   }

  //   const newLayer = L.geoJSON(Continents, {
  //     onEachFeature: onEachFeature,
  //     bubblingMouseEvents: true,
  //   });

  //   map.addLayer(newLayer);
  // }, [mapNum]);

  useEffect(() => {
    const layerList = [];

    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        console.log(layer);
        map.removeLayer(layer);
      }
    });

    const target = Continents.features;

    for (let i = 0; i < target.length; i++) {
      for (let j = 0; j < target[i].geometry.coordinates.length; j++) {
        for (let k = 0; k < target[i].geometry.coordinates[j].length; k++) {
          for (
            let l = 0;
            l < target[i].geometry.coordinates[j][k].length;
            l++
          ) {
            Continents.features[i].geometry.coordinates[j][k][l][0] +=
              mapNum[1] * 360;
          }
        }
      }
    }

    const newLayer = L.geoJSON(Continents, {
      onEachFeature: onEachFeature,
      bubblingMouseEvents: true,
    });

    map.addLayer(newLayer);
  }, [mapNum]);

  const onEachFeature = async (feature, layer) => {
    const continentName = feature.properties.CONTINENT;
    let isChecked = false;

    layer.on("click", (e) => {
      // console.log(e);
      // if (isChecked) layer.setStyle({ fillOpacity: 0, opacity: 0 });
      // else layer.setStyle({ fillOpacity: 0.2, opacity: 0.2 });
      // isChecked = !isChecked;

      map.removeLayer(layer);
    });
    // layer.on("mouseover", () => {
    //   if (!isChecked) {
    //     layer.setStyle({ fillOpacity: 0.2, opacity: 0.2 });
    //   }
    // });
    // layer.on("mouseout", () => {
    //   if (!isChecked) {
    //     layer.setStyle({ fillOpacity: 0, opacity: 0 });
    //   }
    // });

    layer.setStyle({ fillOpacity: 0, opacity: 1, color: "#432C7A" });
  };

  return null;
};

export default WorldMap;
