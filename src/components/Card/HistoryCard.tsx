import { Avatar, Box, Card, Chip, Typography, styled } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, user } from "../../axiosConfig";

const HistoryCard = ({ data, rightsField }: any) => {
  const [currentUser, setCurrentUser] = useState<string>("");
  console.log(222, data);

  const getUser = async () => {
    const currentUser: any = await axios.get(
      baseUrl + user + "/" + data[rightsField]
    );
    console.log(currentUser);
    setCurrentUser(currentUser.data.name);
  };

  useEffect(() => {
    if (!data) return;
    getUser();
  }, [data]);

  return (
    <StyledCard variant="elevation">
      <Box display="flex" alignItems="center" gap="20px">
        <Avatar />
        <Typography variant="h6">{currentUser || data.name}</Typography>
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
        <Chip
          label={data.status}
          color={data.status === "completed" ? "success" : "warning"}
          variant="outlined"
        />
      </Box>
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  padding: "20px",
});

export default HistoryCard;
