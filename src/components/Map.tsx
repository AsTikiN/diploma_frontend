import React, { useState, useEffect, ReactElement, FC, Dispatch } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Box, styled } from "@mui/material";
import { options } from "../mapOptions";

interface Cord {
  lat: number;
  lng: number;
}

interface FindRouteProps {
  start: Cord | undefined;
  end: Cord | undefined;
  points: Cord[];
}

interface Props {
  editMode: boolean;
  path: any;
  setPath?: React.Dispatch<React.SetStateAction<any>>;
  defaultProps: any;
  setDefaultProps: Dispatch<any>;
  mapRoute: any;
  setMapRoute: Dispatch<any>;
  markers: any;
  setMarkers: Dispatch<any>;
}

const Map: FC<Props> = ({
  editMode,
  path,
  setPath,
  defaultProps,
  setDefaultProps,
  mapRoute,
  setMapRoute,
  markers,
  setMarkers,
}): ReactElement => {
  useEffect(() => {
    if (markers.length > 1) {
      findRoute({
        start: markers.at(0),
        end: markers.at(-1),
        points: markers.slice(1, markers.length - 1),
      });
    }
  }, [markers]);

  useEffect(() => {
    if (!path) return;

    if (typeof path === "string") {
      setMarkers(JSON.parse(path).markers);
    } else {
      setMarkers(path.markers);
    }
  }, [path]);

  const findRoute = async ({ start, end, points = [] }: FindRouteProps) => {
    if (!start || !end) return;
    console.log(123123, start.lat, start.lng, end.lat, end.lng);
    try {
      const MOVE = 0.0000000000000005;
      const extraPoint = {
        location: new google.maps.LatLng(
          Math.max(end.lat, start.lat) - Math.abs(end.lat - start.lat),
          Math.max(end.lng, start.lng) - Math.abs(end.lng - start.lng)
        ),
        stopover: false,
      };
      const extraPoint2 = {
        location: new google.maps.LatLng(
          Math.min(end.lat, start.lat) - Math.abs(end.lat - start.lat),
          Math.min(end.lng, start.lng) - Math.abs(end.lng - start.lng)
        ),
        stopover: false,
      };
      const extraPoint3 = {
        location: new google.maps.LatLng(
          Math.max(end.lat, start.lat) - Math.abs(end.lat - start.lat),
          Math.min(end.lng, start.lng) - Math.abs(end.lng - start.lng)
        ),
        stopover: false,
      };
      const extraPoint4 = {
        location: new google.maps.LatLng(
          Math.min(end.lat, start.lat) - Math.abs(end.lat - start.lat),
          Math.max(end.lng, start.lng) - Math.abs(end.lng - start.lng)
        ),
        stopover: false,
      };
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: new google.maps.LatLng(start.lat, start.lng),
        destination: new google.maps.LatLng(end.lat, end.lng),
        waypoints: [
          ...points?.map((point) => ({
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: false,
          })),
        ],
        travelMode: google.maps.TravelMode.WALKING,
      });
      const results2 = await directionService.route({
        origin: new google.maps.LatLng(start.lat - MOVE, start.lng - MOVE),
        destination: new google.maps.LatLng(end.lat - MOVE, end.lng - MOVE),
        waypoints: [
          ...points?.map((point) => ({
            location: new google.maps.LatLng(
              point.lat - MOVE,
              point.lng - MOVE
            ),
            stopover: false,
          })),
          extraPoint2,
        ],
        travelMode: google.maps.TravelMode.WALKING,
      });
      const results3 = await directionService.route({
        origin: new google.maps.LatLng(start.lat - MOVE, start.lng - MOVE),
        destination: new google.maps.LatLng(end.lat - MOVE, end.lng - MOVE),
        waypoints: [
          ...points?.map((point) => ({
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: false,
          })),
          extraPoint,
        ],
        travelMode: google.maps.TravelMode.WALKING,
      });
      const results4 = await directionService.route({
        origin: new google.maps.LatLng(start.lat - MOVE, start.lng - MOVE),
        destination: new google.maps.LatLng(end.lat - MOVE, end.lng - MOVE),
        waypoints: [
          ...points?.map((point) => ({
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: false,
          })),
          extraPoint3,
        ],
        travelMode: google.maps.TravelMode.WALKING,
      });
      const results5 = await directionService.route({
        origin: new google.maps.LatLng(start.lat - MOVE, start.lng - MOVE),
        destination: new google.maps.LatLng(end.lat - MOVE, end.lng - MOVE),
        waypoints: [
          ...points?.map((point) => ({
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: false,
          })),
          extraPoint4,
        ],
        travelMode: google.maps.TravelMode.WALKING,
      });
      setMapRoute(results);
      console.log(
        1231434,
        results.routes[0].legs[0].distance?.text,
        results2.routes[0].legs[0].distance?.text,
        results3.routes[0].legs[0].distance?.text,
        results4.routes[0].legs[0].distance?.text,
        results5.routes[0].legs[0].distance?.text
      );

      if (setPath) {
        //@ts-ignore
        setPath((prev) => ({
          ...prev,
          markers,
          len: results.routes[0].legs[0].distance?.text,
        }));
      }
    } catch (e) {
      console.log("Request error", e);
      setMarkers(markers.slice(0, markers.length - 1));
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !editMode) return;

    const cords = e.latLng;
    setMarkers((prev: any) => [
      ...prev,
      { lat: cords.lat(), lng: cords.lng() },
    ]);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDuBBVGj6vOXKk2NGmBNfKIdrtD75iW3bU",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>error</div>;

  return (
    <GoogleMap
      center={defaultProps.center}
      zoom={defaultProps.zoom}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onClick={handleMapClick}
      options={options}
    >
      {mapRoute && <DirectionsRenderer directions={mapRoute} />}
      {markers.map((marker: Cord, index: number) => (
        <Marker
          key={marker.lat + index}
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
        />
      ))}
    </GoogleMap>
  );
};

const Label = styled(Box)({
  width: "20px",
  height: "20px",
  background: "red",
});

export default Map;
