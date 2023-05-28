import {
  Typography,
  styled,
  Avatar,
  Modal as MuiModal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, drive, user } from "../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginData,
  getRights,
  getUserId,
} from "../redux/reducers/authReducer";
import Modal from "../components/Modal/Modal";
import { setUserData } from "../redux/actions";
import PieChart from "../components/PieChart/PieChart";

const pieChartData = [
  { firstLanguage: "EN_US", secondLanguage: "DE_DE", uv: 35.1 },
  { firstLanguage: "DE_DE", secondLanguage: "EN_US", uv: 20 },
  { firstLanguage: "EN_US", secondLanguage: "FR_FR", uv: 2.9 },
  { firstLanguage: "EN_US", secondLanguage: "IT_IT", uv: 2.9 },
  { firstLanguage: "EN_US", secondLanguage: "JP_JP", uv: 1 },
];

const Profile = () => {
  const dispatch = useDispatch();

  const { email, password, avatar, name } = useSelector(getLoginData);
  const userId = useSelector(getUserId);
  const rights = useSelector(getRights);
  const rightsField = rights === "driver" ? "driverId" : "userId";

  const [localUrl, setLocalUrl] = useState(avatar);
  const [openModal, setOpenModal] = useState(false);
  const [chartData, setChartData] = useState<any>([]);

  const handleSetLocalUrl = (e: any) => setLocalUrl(e.target.value);

  const handleCloseModal = () => setOpenModal(false);

  const handleChangeAvatar = () => {
    axios.put(baseUrl + user + "/" + userId, {
      avatar: localUrl,
    });

    dispatch(setUserData({ email, password, avatar: localUrl, name }));
    setOpenModal(false);
    setLocalUrl("");
  };

  console.log("login, password, avatar", email, password, avatar);

  const handleAvatar = () => {
    setOpenModal(true);
  };

  const getHistory = async () => {
    try {
      const drives: any = await axios.get(baseUrl + drive + "/all");
      const ownDrives = drives.data.filter(
        (drive: any) => drive[rightsField] === userId
      );
      const result: any = {};
      ownDrives.forEach((data: any) => {
        const date = new Date(data.date);
        const key = "" + date.getMonth() + date.getDay() + date.getFullYear();

        if (result[key]) {
          result[key] += data.price;
          return;
        }

        result[key] = data.price;
      });
      const pieChartData = Object.values(result).map((value) => ({
        uv: value,
      }));
      setChartData(pieChartData);
    } catch (e) {
      // toast("Error while getting history!", { type: "error" });
    }
  };

  useEffect(() => {
    if (!rights || rights === "passanger") return;

    getHistory();
  }, [rights]);

  return (
    <Wrapper>
      <ImageWrapper>
        <Avatar
          sx={{ width: "100%", height: "100%" }}
          src={avatar}
          alt="profile photo"
          onClick={handleAvatar}
        />
      </ImageWrapper>
      <Info>
        <Typography variant="h6" fontWeight={"700"}>
          Name: {name}
        </Typography>
        <Typography variant="h6" fontWeight={"700"}>
          Email: {email}
        </Typography>
        <Typography variant="h6" fontWeight={"700"}>
          Password: {password}
        </Typography>
      </Info>
      {chartData && (
        <PieChart
          data={chartData}
          centerText={{
            title: chartData
              .reduce((acc: any, data: any) => (acc += data.uv), 0)
              .toFixed(0),
            value: "Total earnings",
          }}
        />
      )}
      <CustomModal open={openModal} onClose={handleCloseModal}>
        <ModalContent>
          <TextField
            fullWidth
            placeholder="url"
            value={localUrl}
            onChange={handleSetLocalUrl}
          />
          <Avatar
            sx={{ width: "200px", height: "200px", margin: "20px auto" }}
            src={localUrl || avatar}
            alt="profile photo"
            onClick={handleAvatar}
          />
          <Button
            fullWidth
            sx={{ margin: "15px 0" }}
            onClick={handleChangeAvatar}
          >
            Change avatar
          </Button>
        </ModalContent>
      </CustomModal>
    </Wrapper>
  );
};

const Wrapper = styled("div")({});
const Info = styled("div")({
  padding: "0 30px",
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const ImageWrapper = styled("div")({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "0 auto",
  boxShadow: "0 0 100px 1px #c4c4c4",
  marginTop: "60px",
});

const Image = styled("img")({
  width: "200px",
});

const CustomModal = styled(MuiModal)({
  "& .MuiBox-root": {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxHeight: "95%",
    overflowY: "scroll",
    maxWidth: "1440px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "none",
  },
});

const ModalContent = styled(Box)({});

export default Profile;
