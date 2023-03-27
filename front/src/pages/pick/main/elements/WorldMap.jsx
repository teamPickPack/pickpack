import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Continents } from "./data/continents.js";
import { Africa } from "./data/Africa.js";
import { Asia } from "./data/Asia.js";
import { Europe } from "./data/Europe.js";
import { NorthAmerica } from "./data/NorthAmerica.js";
import { SouthAmerica } from "./data/SouthAmerica.js";
import { Oceania } from "./data/Oceania.js";
import styled from "styled-components";

const CONTINENT_MAPPER = [
  ["North America", NorthAmerica],
  ["South America", SouthAmerica],
  ["Africa", Africa],
  ["Asia", Asia],
  ["Europe", Europe],
  ["Oceania", Oceania],
];

// mouse over 시 색상 변경..
// zoom 단계에 따라 대륙별 국가별 구분 - 대륙 클릭 시 확대 해당 대륙의 나라 선택 가능..
// 좌표 변경되어 맵페이지 변경되면 따라서 해당 맵페이지로 상태유지해서 대륙,국가별 좌표 값 이동..

const WorldMap = () => {
  const position = [51.505, -0.09];
  return (
    <MapBox>
      <MapContainer
        center={position}
        minZoom={2}
        zoom={2}
        style={{ height: "540px" }}
      >
        <TileLayer url="https://mt0.google.com/vt/lyrs=m&hl=kr&x={x}&y={y}&z={z}" />
        <MapController />
      </MapContainer>
    </MapBox>
  );
};

const MapBox = styled.div`
  width: 100%;
  .leaflet-control-attribution {
    display: none;
  }
`;

const MapController = () => {
  const [mapNum, setMapNum] = useState([0, 0]);
  const [zoomLevel, setZoomLevel] = useState(2);

  const map = useMapEvents({
    click(e) {
      map.flyTo({ lat: e.latlng.lat, lng: e.latlng.lng });
      updateMapPosition();
    },
    dragend() {
      updateMapPosition();
    },
    zoomanim(e) {
      setZoomLevel(e.zoom);
    },
  });

  const updateMapPosition = () => {
    const center = map.getCenter();
    const currNum = parseInt(Math.round(center.lng / 360));

    if (mapNum[0] !== currNum) {
      setMapNum([currNum, currNum - mapNum[0]]);
    }
  };

  const continentEachFeature = async (feature, layer) => {
    const continentName = feature.properties.CONTINENT;

    layer.on("click", (e) => {
      setCountryLayer(continentName);
      if (map.getZoom() > 2) {
        map.flyTo(e.latlng, 2);
        setZoomLevel(2);
      } else {
        map.flyTo(e.latlng, 4);
        setZoomLevel(4);
      }
    });
    layer.on("mouseover", () => {
      layer.setStyle({ fillOpacity: 0.2, opacity: 0.6 });
    });
    layer.on("mouseout", () => {
      layer.setStyle({ fillOpacity: 0, opacity: 0 });
    });

    layer.setStyle({ fillOpacity: 0, opacity: 0, color: "#432C7A" });
  };

  const countryEachFeature = async (feature, layer) => {
    layer.on("click", (e) => {
      map.flyTo(e.latlng, map.getZoom() + 1);
    });
    layer.on("mouseover", () => {
      layer.setStyle({ fillOpacity: 0.2, opacity: 0.2 });
    });
    layer.on("mouseout", () => {
      layer.setStyle({ fillOpacity: 0, opacity: 0 });
    });

    layer.setStyle({ fillOpacity: 0, opacity: 0, color: "red" });
  };

  const continentLayer = useRef();
  const countryLayer = useRef();

  const setCountryLayer = (name) => {
    console.log(name);
    if (countryLayer.current)
      CONTINENT_MAPPER.map((continent) => {
        if (countryLayer.current[continent[0]] !== undefined) {
          console.log(countryLayer.current);
          map.removeLayer(countryLayer.current[continent[0]]);
        }
      });

    CONTINENT_MAPPER.map((continent) => {
      if (name === continent[0]) {
        console.log(countryLayer.current);

        countryLayer.current = {
          [continent[0]]: L.geoJSON(continent[1], {
            onEachFeature: countryEachFeature,
            bubblingMouseEvents: false,
          }),
        };

        countryLayer.current[continent[0]].eachLayer((layer) => {
          if (layer._latlngs) {
            layer._latlngs.map((latlng) => {
              latlng.map((coord) => {
                if (coord.length) {
                  coord.map((point) => {
                    point.lng = point.lng + mapNum[0] * 360;
                  });
                } else {
                  coord.lng = coord.lng + mapNum[0] * 360;
                }
              });
            });
          }
        });

        console.log(countryLayer.current);

        map.addLayer(countryLayer.current[continent[0]]);
      }
    });
  };

  useEffect(() => {
    if (zoomLevel === 2) {
      if (continentLayer.current) {
        map.removeLayer(continentLayer.current);
      }

      if (countryLayer.current) {
        CONTINENT_MAPPER.map((continent) => {
          if (countryLayer.current[continent[0]] !== undefined) {
            map.removeLayer(countryLayer.current[continent[0]]);
          }
        });
      }

      continentLayer.current = L.geoJSON(Continents, {
        onEachFeature: continentEachFeature,
        bubblingMouseEvents: false,
      });

      continentLayer.current.eachLayer((layer) => {
        if (layer._latlngs) {
          layer._latlngs.map((latlng) => {
            latlng.map((coord) => {
              coord.map((point) => {
                point.lng = point.lng + mapNum[0] * 360;
              });
            });
          });
        }
      });

      map.addLayer(continentLayer.current);
    }
  }, [zoomLevel]);

  useEffect(() => {
    const layerList = [];

    continentLayer.current.eachLayer((layer) => {
      if (layer._latlngs) {
        layer._latlngs.map((latlng) => {
          latlng.map((coord) => {
            coord.map((point) => {
              point.lng = point.lng + mapNum[1] * 360;
            });
          });
        });

        const copy = Object.assign(layer, {});
        layerList.push(copy);
        map.removeLayer(layer);
      }
    });

    CONTINENT_MAPPER.map((continent) => {
      if (countryLayer.current)
        if (countryLayer.current[continent[0]] !== undefined) {
          countryLayer.current[continent[0]].eachLayer((layer) => {
            if (layer._latlngs) {
              layer._latlngs.map((latlng) => {
                latlng.map((coord) => {
                  if (coord.length) {
                    coord.map((point) => {
                      point.lng = point.lng + mapNum[1] * 360;
                    });
                  } else {
                    coord.lng = coord.lng + mapNum[1] * 360;
                  }
                });
              });

              if (zoomLevel !== 2) {
                const copy = Object.assign(layer, {});
                layerList.push(copy);
              }
              map.removeLayer(layer);
            }
          });
        }
    });

    layerList.forEach((layer) => {
      map.addLayer(layer);
    });
  }, [mapNum]);

  return null;
};

export default WorldMap;
