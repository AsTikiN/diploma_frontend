import { useState, useEffect } from "react";
import Map from "../components/Map";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
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
    _id: null,
    date: "",
    driverId: null,
    userId: null,
    path: "",
    comment: "",
  });
  const [freeDrives, setFreeDrives] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [commentData, setCommentData] = useState("");

  const rights = useSelector(getRights);
  const personId = useSelector(getUserId);

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
    toast("Зачекайте доки ми знайдемо водія!", { type: "default" });
    const driveResult = await axios.post(baseUrl + drive, {
      price: calcPrice(),
      date: new Date(),
      distance: path?.len,
      userId: personId,
      path: JSON.stringify(path),
      status: "in-progress",
      comment: commentData,
    });

    const intervalId = setInterval(async () => {
      const driveStatus = await axios.get(
        baseUrl + drive + "/" + driveResult.data._id
      );

      if (driveStatus.data.driverId) {
        const driver = await axios.get(
          baseUrl + user + "/" + driveStatus.data.driverId
        );

        setDriver((prev) => ({
          ...prev,
          isLoading: false,
          name: driver.data.name,
          distance: path?.len,
          price: calcPrice(),
          driverId: driveStatus.data.driverId,
        }));
        clearInterval(intervalId);
        const stopDriveInterval = setInterval(async () => {
          const driveStatus = await axios.get(
            baseUrl + drive + "/" + driveResult.data._id
          );

          if (driveStatus.data.status === "completed") {
            setDriver({
              isLoading: false,
              name: "",
              avatar: "",
              distance: "",
              price: 0,
              status: "",
              _id: null,
              date: "",
              driverId: null,
              userId: null,
              path: "",
              comment: "",
            });
            clearInterval(stopDriveInterval);
            clearInterval(intervalId);
          }
        }, 1500);
      }
    }, 1500);
  };

  useEffect(() => {
    if (rights !== "driver") return;
    fetchAvailibleDrives();
  }, [rights]);

  const fetchAvailibleDrives = async () => {
    const drives: any = await axios.get(baseUrl + drive + "/free");
    let data = [];
    if (personId === "64613aede0b8b413c52fa834") {
      data = drives.data.slice(0, drives.data.length / 2);
    }

    if (personId === "647986fd3c35b602228a2e11") {
      data = drives.data.slice(drives.data.length / 2, drives.data.length);
    }

    if (drives.data) setFreeDrives(data);
  };

  const handleStart = (currentDrive: any) => async () => {
    console.log(currentDrive);
    if (!currentDrive) return;
    const updated = await axios.put(baseUrl + drive + "/" + currentDrive._id, {
      ...currentDrive,
      driverId: personId,
      status: "in-progress",
    });
    const {
      userId,
      distance,
      price,
      status,
      _id,
      date,
      driverId,
      path,
      comment,
    } = updated?.data;
    const userData = await axios.get(baseUrl + user + "/" + userId);
    const { name } = userData.data;
    setDriver({
      isLoading: false,
      name,
      avatar: "",
      distance,
      price,
      status,
      date,
      _id,
      driverId,
      path,
      userId,
      comment,
    });
    setCommentData(comment);
    setMarkers(JSON.parse(currentDrive.path)?.markers);
    console.log(2002412, currentDrive);
  };

  const handleEndDrive = async () => {
    const { price, date, distance, driverId, userId, path } = driver;

    await axios.put(baseUrl + drive + "/" + driver._id, {
      price,
      date,
      distance,
      driverId,
      userId,
      path,
      status: "completed",
    });

    setDriver({
      isLoading: false,
      name: "",
      avatar: "",
      distance: "",
      price: 0,
      status: "",
      _id: null,
      date: "",
      driverId: null,
      userId: null,
      path: "",
      comment: "",
    });
    setPath("");
    setMarkers([]);
    setMapRoute(null);

    fetchAvailibleDrives();
  };

  useEffect(() => {
    let intervalId: any = null;
    if (rights === "driver") {
      intervalId = setInterval(() => fetchAvailibleDrives(), 3000);
    }
    return () => clearInterval(intervalId);
  }, []);

  const getPersonalDrives = async () => {
    const userDrives: any = await axios.get(
      baseUrl + drive + "/personal/" + personId
    );
    const {
      distance,
      driverId,
      userId,
      date,
      price,
      status,
      _id,
      path,
      comment,
    }: any = userDrives?.data;
    const driverData = await axios.get(baseUrl + user + "/" + driverId);
    setDriver({
      isLoading: false,
      name: driverData.data.name,
      avatar: "",
      distance,
      driverId,
      userId,
      date,
      price,
      status,
      _id,
      path,
      comment,
    });
    setPath(JSON.parse(path));
    setIsModalOpened(true);
    const intervalId = setInterval(async () => {
      const userDrives: any = await axios.get(baseUrl + drive + "/" + _id);
      const { status } = userDrives.data;
      if (status === "completed") {
        setDriver({
          isLoading: false,
          name: "",
          avatar: "",
          distance: "",
          price: 0,
          status: "",
          _id: null,
          date: "",
          driverId: null,
          userId: null,
          path: "",
          comment: "",
        });
        setPath("");
        setMarkers([]);
        setMapRoute(null);
        setIsModalOpened(false);
        clearInterval(intervalId);
      }
    }, 3000);
  };

  useEffect(() => {
    console.log(personId);

    if (rights === "passanger" && personId) {
      getPersonalDrives();
    }
  }, [personId, rights]);

  console.log(driver);

  return (
    <MapWrapper>
      <Map
        defaultProps={defaultProps}
        setDefaultProps={setDefaultProps}
        mapRoute={mapRoute}
        setMapRoute={setMapRoute}
        markers={markers}
        setMarkers={setMarkers}
        editMode={rights === "passanger" && !driver.name}
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
            <Typography>Дистанція: {path?.len || 0}</Typography>
            <Typography>Вартість: {calcPrice()} GRN</Typography>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Ваш коментар"
              disabled={driver.isLoading}
              value={commentData}
              onChange={(e: any) => setCommentData(e.target.value)}
            />
            {driver.isLoading ? (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={1}
                >
                  <CircularProgress />
                  <Typography>Зачекайте доки ми знайдемо водія</Typography>
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
                  Відмінити
                </Button>
              </>
            ) : (
              <Actions>
                <Button
                  onClick={handleFindDriver}
                  variant="contained"
                  fullWidth
                >
                  Пошук водія
                </Button>
                <Button
                  color="error"
                  onClick={handleClearPath}
                  variant="contained"
                  fullWidth
                >
                  Очистити шлях
                </Button>
              </Actions>
            )}
          </>
        )}
        {rights === "driver" && freeDrives && !driver.name && (
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "300px",
              // paddingBottom: "45px",
            }}
          >
            {freeDrives?.map((drive: any, index) => (
              <FreeDriveCard
                data={drive}
                key={drive._id}
                onStart={handleStart(drive)}
              />
            ))}
            {!freeDrives.length && (
              <Placeholder>
                <Typography variant="h5">Поки немає замовлень</Typography>{" "}
              </Placeholder>
            )}
          </Box>
        )}
        {rights === "passanger" && driver.name && (
          <HistoryCard
            data={driver}
            rightsField={rightsField}
            carNumber="AE5470IO"
          />
        )}
        {rights === "driver" && driver.name && (
          <>
            <Typography>Ім'я пасажира: {driver.name}</Typography>
            <Typography>Дистанція: {path?.len || 0}</Typography>
            <Typography>Вартість: {calcPrice()} GRN</Typography>
            {commentData && <Typography>Коментар: {commentData}</Typography>}

            <Actions>
              <Button onClick={handleEndDrive} variant="contained" fullWidth>
                Завершити
              </Button>
            </Actions>
          </>
        )}
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

const Placeholder = styled("div")({
  height: "150px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default Main;
