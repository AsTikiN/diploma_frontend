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
import {
  getIsAuthorized,
  getRights,
  getUserId,
} from "../redux/reducers/authReducer";
import axios from "axios";
import { baseUrl, drive, user } from "../axiosConfig";
import FreeDriveCard from "../components/Card/FreeDriveCard";
import Arrow from "../images/arrow";
import HistoryCard from "../components/Card/HistoryCard";

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
    name: "",
    avatar: "",
    distance: "",
    price: 0,
    status: "in progress",
  });
  const [freeDrives, setFreeDrives] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const rights = useSelector(getRights);
  const personId = useSelector(getUserId);
  console.log(23123, personId);
  const handleClearPath = () => {
    setMapRoute(null);
    setMarkers([]);
    setPath(null);
  };
  const rightsField = rights === "driver" ? "driverId" : "userId";

  const getDigitFromLen = (len: string) =>
    +len.replace(",", ".").replace(" км", "");

  const calcPrice = () =>
    (getDigitFromLen(path?.len || "0 km") * PRICE_PER_KM || 0) +
    PRICE_FOR_CAR +
    PRICE_PER_STOP * (path?.markers?.length - 2);

  const handleFindDriver = async () => {
    setDriver((prev) => ({ ...prev, isLoading: true }));
    toast("We are trying to find driver!", { type: "default" });
    const driveResult = await axios.post(baseUrl + drive, {
      price: calcPrice(),
      date: new Date(),
      distance: path?.len,
      userId: personId,
      path: JSON.stringify(path),
    });

    const intervalId = setInterval(async () => {
      const driveStatus = await axios.get(
        baseUrl + drive + "/" + driveResult.data._id
      );
      console.log(500);
      if (driveStatus.data.driverId) {
        const driver = await axios.get(
          baseUrl + user + "/" + driveStatus.data.driverId
        );
        console.log(200200200, driver.data);
        setDriver((prev) => ({
          ...prev,
          isLoading: false,
          name: driver.data.name,
          distance: path?.len,
          price: calcPrice(),
        }));
        clearInterval(intervalId);
      }
    }, 1500);
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

  const handleStart = (currentDrive: any) => async () => {
    console.log(currentDrive);
    if (!currentDrive) return;
    const updated = await axios.put(baseUrl + drive + "/" + currentDrive._id, {
      ...currentDrive,
      driverId: personId,
    });
    setMarkers(JSON.parse(currentDrive.path)?.markers);
    console.log(2002412, currentDrive);
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
      <OwnModal
        show={
          (path?.markers?.length > 1 || rights === "driver") && isModalOpened
        }
      >
        {(path?.markers?.length > 1 || rights === "driver") && (
          <ToggleModal
            className="modal-toggler"
            onClick={() => setIsModalOpened((prev) => !prev)}
          >
            <Arrow />
          </ToggleModal>
        )}

        {rights === "passanger" && !driver.name && (
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
        {rights === "driver" && freeDrives && (
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "300px",
              paddingBottom: "45px",
            }}
          >
            {freeDrives?.map((drive: any, index) => (
              <FreeDriveCard
                data={drive}
                key={drive._id}
                onStart={handleStart(drive)}
              />
            ))}
          </Box>
        )}
        {driver.name && <HistoryCard data={driver} rightsField={rightsField} />}
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
  maxHeight: "300px",

  "& .modal-toggler": {
    top: props.show ? "-50px" : "-135px",
    transform: props.show
      ? "translateX(-50%) rotate(90deg)"
      : "translateX(-50%) rotate(-90deg)",
  },
}));

const ToggleModal = styled("div")({
  position: "absolute",
  left: "50%",
  top: "-50px",
  transform: "translateX(-50%) rotate(90deg)",
  transition: "transform 0.1s linear, top 0.3s linear",

  "svg path": {
    fill: "#000",
    opacity: "0.5",
  },
});

const Actions = styled("div")({
  display: "flex",
  gap: "10px",
  marginTop: "15px",
});

export default Main;
