import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRights } from "../../redux/reducers/authReducer";
import axios from "axios";
import { baseUrl, user } from "../../axiosConfig";
import { getLoginData } from "../../redux/reducers/authReducer";

const FreeDriveCard = ({ data, onStart }: any) => {
  const [userData, setUserData] = useState<any>(null);

  const getUserAvatar = async () => {
    const userData = await axios.get(baseUrl + user + "/" + data.userId);

    setUserData(userData.data);
  };

  useEffect(() => {
    if (data.userId) {
      getUserAvatar();
    }
  }, [data]);

  return (
    <StyledCard variant="elevation">
      <Box display="flex" alignItems="center" gap="20px">
        <Avatar src={userData?.avatar} />
        <Typography variant="h6">Passanger: {userData?.name}</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        justifyContent="space-between"
        mt={1.5}
      >
        <Box>
          <Typography variant="h6">Distance: {data.distance}</Typography>
          <Typography variant="h6">Cost: {data.price} GRN</Typography>
        </Box>
        <Button color="success" variant="contained" onClick={onStart}>
          Accept
        </Button>
      </Box>
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  padding: "20px",
});

export default FreeDriveCard;
