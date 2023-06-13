import React, {
  useState,
  useEffect,
  ReactElement,
  FC,
  Dispatch,
  useRef,
} from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { Box, Button, TextField, styled } from "@mui/material";
import { options } from "../mapOptions";
import PlaceParker from "../images/placeMarker";
import { toast } from "react-toastify";

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
  const searchFieldRef = useRef<any>(null);

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

  const getLatlongFromPlace = (address: string) => {
    const geocoder = new google.maps.Geocoder();
    // var address = document.getElementById("textboxid").value;
    geocoder.geocode(
      {
        address,
      },
      (results: any, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          setMarkers((prev: Marker[]) => [
            ...prev,
            { lat: latitude, lng: longitude },
          ]);
        }
      }
    );
  };

  const findRoute = async ({ start, end, points = [] }: FindRouteProps) => {
    if (!start || !end) return;

    try {
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

      setMapRoute(results);

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

  const handleSetMarkerOnPlace = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = searchFieldRef?.current;
    const value = element.firstChild.firstChild.value;
    console.log(value, markers);
    getLatlongFromPlace(value);
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
      {editMode && (
        <SearchPlace>
          <Autocomplete>
            <SearchField
              placeholder="Введіть адресу"
              ref={searchFieldRef}
              fullWidth
            />
          </Autocomplete>
          <Button
            sx={{ position: "absolute", right: 0 }}
            onClick={handleSetMarkerOnPlace}
          >
            <PlaceParker />
          </Button>
        </SearchPlace>
      )}
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

const SearchPlace = styled(Box)({
  position: "absolute",
  left: "10px",
  top: "60px",
  // transform: "translate(-50%, -50%)",
  background: "#fff",
  borderRadius: "4px",
  width: "calc(100% - 20px)",
  display: "flex",
  gap: "10px",

  "& > div": {
    flex: 1,
  },
});

const SearchField = styled(TextField)({
  input: {
    paddingRight: "60px",
  },
});

export default Map;
