import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
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
import airportImg from "../../../../assets/image/airplane-img.png";
import tourImg from "../../../../assets/image/tour-img.png";
import { relationOfAirport } from "./data/Relation.js";
import { useDispatch, useSelector } from "react-redux";
import { flightAction } from "../../../../store/flightSlice.js";

const CONTINENT_MAPPER = [
  ["North America", NorthAmerica],
  ["South America", SouthAmerica],
  ["Africa", Africa],
  ["Asia", Asia],
  ["Europe", Europe],
  ["Oceania", Oceania],
];

const WorldMap = (props) => {
  const tourItem = props.tourItem;
  const tourContinent = props.tourContinent;
  const position = [25, 0];

  return (
    <MapBox>
      <MapContainer
        center={position}
        minZoom={1}
        zoom={2}
        style={{ height: "480px" }}
        worldCopyJump={true}
        maxBounds={L.latLngBounds([-90, -Infinity], [90, Infinity])}
        maxBoundsViscosity={1}
      >
        <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=ko&x={x}&y={y}&z={z}" />
        {/* <TileLayer url="http://mt0.google.com/vt/lyrs=p&hl=ko&x={x}&y={y}&z={z}" /> */}
        {/* <TileLayer url="http://mt0.google.com/vt/lyrs=y&hl=ko&x={x}&y={y}&z={z}" /> */}
        {/* <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" /> */}
        <MapController
          tourItem={tourItem}
          tourContinent={tourContinent}
          setDestination={props.setDestination}
          setDeparture={props.setDeparture}
          criterion={props.criterion}
        />
      </MapContainer>
    </MapBox>
  );
};

const MapController = (props) => {
  const [zoomLevel, setZoomLevel] = useState(2);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const tourItem = props.tourItem;
  const markers = useRef();

  const dispatch = useDispatch();

  // const criterion = useSelector((state) => {
  //   return state.flight.criterion;
  // });
  const criterion = props.criterion;

  const map = useMapEvents({
    click(e) {
      map.flyTo({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    zoomanim(e) {
      setZoomLevel(e.zoom);
    },
    zoomend(e) {
      if (airportMarkers.current) {
        if (e.target._zoom > 4) {
          airportMarkers.current.getLayers().forEach((marker) => {
            marker.openTooltip();
          });
        } else {
          airportMarkers.current.getLayers().forEach((marker) => {
            marker.closeTooltip();
          });
        }
      }
      if (markers.current && e.target._zoom < 3) {
        markers.current.closeTooltip();
      }
    },
  });

  const continentEachFeature = async (feature, layer) => {
    const continentName = feature.properties.CONTINENT;

    layer.on("click", (e) => {
      setCountryLayer(continentName);
      setSelectedContinent(layer);
      map.removeLayer(layer);
      map.flyTo(e.latlng, 3);
      setZoomLevel(3);
    });
    layer.on("mouseover", () => {
      layer.setStyle({ fillOpacity: 0.2, opacity: 0.3 });
    });
    layer.on("mouseout", () => {
      layer.setStyle({ fillOpacity: 0, opacity: 0 });
    });

    layer.setStyle({ fillOpacity: 0, opacity: 0, color: "#432C7A" });
  };

  const countryEachFeature = async (feature, layer) => {
    layer.on("click", (e) => {
      setSelectedCountry(layer);
      map.flyTo(
        e.latlng,
        map.getZoom() > 4 ? map.getZoom() : map.getZoom() + 1
      );
    });
    layer.on("mouseover", () => {
      layer.setStyle({ fillOpacity: 0.2 });
    });
    layer.on("mouseout", () => {
      layer.setStyle({ fillOpacity: 0 });
    });

    layer.setStyle({ fillOpacity: 0, opacity: 0.3, color: "red" });
  };

  const continentLayer = useRef();
  const countryLayer = useRef();
  const airportMarkers = useRef();
  const tourMarker = useRef();

  const flightIcon = L.icon({
    iconUrl: airportImg,
    iconSize: [28, 28],
  });

  const setCountryLayer = (name) => {
    if (countryLayer.current)
      CONTINENT_MAPPER.map((continent) => {
        if (countryLayer.current[continent[0]] !== undefined) {
          map.removeLayer(countryLayer.current[continent[0]]);
        }
      });

    removeAirportMarkers();

    let currContinent;

    relationOfAirport.forEach((continent) => {
      if (continent.name === name) {
        currContinent = continent;
      }
    });

    const selectedItem = {
      name: currContinent.name_ko,
      subName: "",
      code: currContinent.code,
    };

    if (criterion === "departure") {
      // dispatch(flightAction.setDestination(selectedItem));
      props.setDestination(selectedItem);
    } else {
      // dispatch(flightAction.setDeparture(selectedItem));
      props.setDeparture(selectedItem);
    }

    CONTINENT_MAPPER.map((continent) => {
      if (name === continent[0]) {
        countryLayer.current = {
          [continent[0]]: L.geoJSON(null, {
            onEachFeature: countryEachFeature,
            bubblingMouseEvents: false,
          }),
        };

        continent[1].features.forEach((country) => {
          const countryName = country.properties.name_en;

          for (let index = 0; index < currContinent.countries.length; index++) {
            if (currContinent.countries[index].name_en === countryName) {
              countryLayer.current[continent[0]].addData(country);

              break;
            }
          }
        });

        map.addLayer(countryLayer.current[continent[0]]);
      }
    });

    currContinent.countries.forEach((country) => {
      country.airports.forEach((airport) => {
        airportMarkers.current.addLayer(
          L.marker([airport.lat, airport.lng], {
            icon: flightIcon,
            bubblingMouseEvents: false,
          })
            .bindPopup(
              `공항명: ${airport.name}<br/>국가: ${airport.country}<br/>도시: ${airport.city}`
            )
            .bindTooltip(airport.name)
            .on("tooltipopen", (e) => {
              if (map.getZoom() < 4) e.target.closeTooltip();
            })
            .on("mouseover", (e) => {
              if (map.getZoom() > 3) {
                e.target.openTooltip();
              }
            })
            .on("click", (e) => {
              const selectedAirport = {
                name: airport.city,
                subName: "",
                code: airport.code,
              };

              if (criterion === "departure") {
                // dispatch(flightAction.setDestination(selectedAirport));
                props.setDestination(selectedAirport);
              } else {
                // dispatch(flightAction.setDeparture(selectedAirport));
                props.setDeparture(selectedAirport);
              }
            })
        );
      });
    });
  };

  const removeAirportMarkers = () => {
    airportMarkers.current.getLayers().forEach((layer) => {
      airportMarkers.current.removeLayer(layer);
    });
  };

  useEffect(() => {
    if (selectedCountry !== null) {
      removeAirportMarkers();

      let currContinent;

      relationOfAirport.forEach((continent) => {
        if (continent.name === selectedContinent.feature.properties.CONTINENT) {
          currContinent = continent;
        }
      });

      currContinent.countries.forEach((country) => {
        if (country.name_en === selectedCountry.feature.properties.name_en) {
          const selectedItem = {
            name: country.name_ko,
            subName: "",
            code: country.code,
          };

          if (criterion === "departure") {
            // dispatch(flightAction.setDestination(selectedItem));
            props.setDestination(selectedItem);
          } else {
            // dispatch(flightAction.setDeparture(selectedItem));
            props.setDeparture(selectedItem);
          }
          country.airports.forEach((airport) => {
            airportMarkers.current.addLayer(
              L.marker([airport.lat, airport.lng], {
                icon: flightIcon,
                bubblingMouseEvents: false,
              })
                .bindPopup(
                  `공항명: ${airport.name}<br/>국가: ${airport.country}<br/>도시: ${airport.city}`
                )
                .bindTooltip(airport.name)
                .on("tooltipopen", (e) => {
                  if (map.getZoom() < 4) e.target.closeTooltip();
                })
                .on("mouseover", (e) => {
                  if (map.getZoom() > 3) {
                    e.target.openTooltip();
                  }
                })
                .on("click", (e) => {
                  const selectedAirport = {
                    name: airport.city,
                    subName: "",
                    code: airport.code,
                  };

                  if (criterion === "departure") {
                    // dispatch(flightAction.setDestination(selectedAirport));
                    props.setDestination(selectedAirport);
                  } else {
                    // dispatch(flightAction.setDeparture(selectedAirport));
                    props.setDeparture(selectedAirport);
                  }
                })
            );
          });
        }
      });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (continentLayer.current !== undefined) {
      map.removeLayer(continentLayer.current);
    }
    continentLayer.current = L.geoJSON(Continents, {
      onEachFeature: continentEachFeature,
      bubblingMouseEvents: false,
    });

    if (selectedContinent !== null)
      continentLayer.current.getLayers().forEach((layer) => {
        if (
          layer.feature.properties.CONTINENT ===
          selectedContinent.feature.properties.CONTINENT
        ) {
          continentLayer.current.removeLayer(layer);
        }
      });

    map.addLayer(continentLayer.current);
  }, [selectedContinent]);

  // 공항마커추가
  useEffect(() => {
    airportMarkers.current = L.featureGroup().addTo(map);
  }, []);

  useEffect(() => {
    if (zoomLevel === 1) {
      if (countryLayer.current) {
        CONTINENT_MAPPER.map((continent) => {
          if (countryLayer.current[continent[0]] !== undefined) {
            map.removeLayer(countryLayer.current[continent[0]]);
          }
        });
      }

      removeAirportMarkers();
      setSelectedContinent(null);
    }
  }, [zoomLevel]);

  useEffect(() => {
    if (markers.current) map.removeLayer(markers.current);

    if (tourItem !== null) {
      const tourIcon = L.icon({
        iconUrl: tourImg,
        iconSize: [64, 64],
      });

      markers.current = L.marker([tourItem.lat, tourItem.lng], {
        icon: tourIcon,
        bubblingMouseEvents: false,
      })
        .bindTooltip(
          `<img src=${tourItem.imgUrl} style="width:120px;height:80px"}}/><br/>${tourItem.touristName}`,
          { offset: L.point([15, 0]) }
        )
        .on("tooltipopen", (e) => {
          if (map.getZoom() < 1) e.target.closeTooltip();
        })
        .on("mouseout", (e) => {
          if (map.getZoom() > 2) {
            e.target.openTooltip();
          }
        })
        .addTo(map);

      map.flyTo([tourItem.lat, tourItem.lng], 5);

      markers.current.openTooltip();

      removeAirportMarkers();

      const data = {
        feature: {
          properties: {
            CONTINENT: props.tourContinent,
          },
        },
      };

      setSelectedContinent(data);
      setCountryLayer(props.tourContinent);
    }
  }, [tourItem]);

  return null;
};

const MapBox = styled.div`
  width: 100%;
  .leaflet-control-attribution {
    display: none;
  }
`;

export default WorldMap;
