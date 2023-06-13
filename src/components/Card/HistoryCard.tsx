import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Rating,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, user } from "../../axiosConfig";
import { toast } from "react-toastify";

const HistoryCard = ({ data, rights, avatar, rate, carNumber }: any) => {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(0);
  const rightsField = rights === "driver" ? "userId" : "driverId";
  console.log(222, data);

  const getUser = async () => {
    console.log(235325, data, rightsField);
    const currentUser: any = await axios.get(
      baseUrl + user + "/" + data[rightsField]
    );
    console.log("currentUser", currentUser);
    setCurrentUser(currentUser.data.name);
    // if (avatar) return;
    setCurrentAvatar(currentUser.data.avatar);
    console.log("avatars", avatar, currentUser.data.avatar);
  };

  useEffect(() => {
    if (!data) return;
    getUser();
  }, [data]);

  return (
    <StyledCard variant="elevation">
      <Box display="flex" alignItems="center" gap="20px">
        <Avatar src={avatar || currentAvatar} />
        <Typography variant="h6">{currentUser || data.name}</Typography>
        <Typography variant="h6"> {carNumber}</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        justifyContent="space-between"
        mt={1.5}
      >
        <Box>
          <Typography variant="h6">Відстань: {data.distance}</Typography>
          <Typography variant="h6">Вартість: {data.price} ГРН</Typography>
        </Box>
        <Chip
          label={data.status === "completed" ? "Завершено" : "В дорозі"}
          color={data.status === "completed" ? "success" : "warning"}
          variant="outlined"
        />
      </Box>
      {rate && data.status === "completed" && (
        <Box sx={{ marginTop: "10px" }}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue as number);
            }}
          />
          <Box sx={{ marginTop: "10px" }}>
            <TextField
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              fullWidth
              placeholder="Коментар"
            ></TextField>
            {comment && (
              <Button onClick={() => toast.success("Дякуємо за відгук!")}>
                Залишити коментар
              </Button>
            )}
          </Box>
        </Box>
      )}
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  padding: "20px",
});

export default HistoryCard;
