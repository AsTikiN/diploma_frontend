import { useState, useEffect } from "react";
import Map from "../components/Map";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  styled,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getRights } from "../redux/reducers/authReducer";
import axios from "axios";
import { baseUrl, drive } from "../axiosConfig";
import FreeDriveCard from "../components/Card/FreeDriveCard";

interface Cord {
  lat: number;
  lng: number;
}

const PRICE_PER_KM = 16;
const PRICE_FOR_CAR = 20;
const PRICE_PER_STOP = 20;

const Main = () => {
  const [path, setPath] = useState<any>();
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 48.460255107435785,
      lng: 35.044156794967655,
    },
    zoom: 14,
  });
  const [mapRoute, setMapRoute] = useState<any>(null);
  const [markers, setMarkers] = useState<Cord[]>([]);
  const [driver, setDriver] = useState({
    isLoading: false,
    name: "Alexandr",
    avatar: "",
  });
  const [freeDrives, setFreeDrives] = useState([]);
  const rights = useSelector(getRights);

  const handleClearPath = () => {
    setMapRoute(null);
    setMarkers([]);
    setPath(null);
  };

  const getDigitFromLen = (len: string) =>
    +len.replace(",", ".").replace(" км", "");

  const calcPrice = () =>
    (getDigitFromLen(path?.len || "0 km") * PRICE_PER_KM || 0) +
    PRICE_FOR_CAR +
    PRICE_PER_STOP * (path?.markers?.length - 2);

  const handleFindDriver = () => {
    setDriver((prev) => ({ ...prev, isLoading: true }));
    toast("We are trying to find driver!", { type: "default" });
  };

  useEffect(() => {
    if (rights !== "driver") return;
    fetchAvailibleDrives();
  }, [rights]);

  const fetchAvailibleDrives = async () => {
    const drives: any = await axios.get(baseUrl + drive + "/free");
    console.log(20130123, drives);
    if (drives.data.length) setFreeDrives(drives.data);
  };
  console.log(123213, freeDrives);
  return (
    <MapWrapper>
      <Map
        defaultProps={defaultProps}
        setDefaultProps={setDefaultProps}
        mapRoute={mapRoute}
        setMapRoute={setMapRoute}
        markers={markers}
        setMarkers={setMarkers}
        editMode={rights === "passanger"}
        setPath={setPath}
        path={path}
      />
      <OwnModal show={path?.markers?.length > 1 || rights === "driver"}>
        {rights === "passanger" && (
          <>
            <Typography>Distance: {path?.len || 0}</Typography>
            <Typography>Price: {calcPrice()} GRN</Typography>
            {driver.isLoading ? (
              <>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CircularProgress />
                  <Typography>Trying to find driver</Typography>
                </Box>
                <Button
                  sx={{ mt: 1.5 }}
                  fullWidth
                  color="error"
                  variant="contained"
                  onClick={() =>
                    setDriver((prev) => ({ ...prev, isLoading: false }))
                  }
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Actions>
                <Button
                  onClick={handleFindDriver}
                  variant="contained"
                  fullWidth
                >
                  Find driver
                </Button>
                <Button
                  color="error"
                  onClick={handleClearPath}
                  variant="contained"
                  fullWidth
                >
                  Clear path
                </Button>
              </Actions>
            )}
          </>
        )}
        {rights === "driver" &&
          freeDrives &&
          freeDrives?.map((drive: any, index) => (
            <FreeDriveCard data={drive} key={drive._id} />
          ))}
      </OwnModal>
    </MapWrapper>
  );
};

const MapWrapper = styled("div")({
  padding: "20px",
  maxHeight: "100%",
  position: "relative",
  width: "50%",
  height: "100vh",

  ["@media (max-width:768px)"]: {
    // eslint-disable-line no-useless-computed-key
    width: "100%",
    order: 1,
    padding: 0,
  },
});

const OwnModal = styled("div")<{ show: boolean }>((props) => ({
  position: "fixed",
  width: "100%",
  zIndex: "1000",
  background: "#fff",
  borderRadius: "10px 10px 0 0",
  bottom: 0,
  transition: "transform 0.3s linear",
  transform: props.show ? "translate(0, 0)" : "translate(0, 100%)",
  padding: "30px 10px",
}));

const Actions = styled("div")({
  display: "flex",
  gap: "10px",
  marginTop: "15px",
});

export default Main;
