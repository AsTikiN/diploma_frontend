import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const FreeDriveCard = ({ data, onStart }: any) => {
  console.log(onStart);
  return (
    <StyledCard variant="elevation">
      <Box display="flex" alignItems="center" gap="20px">
        <Avatar />
        <Typography variant="h6">Passanger: Alexandr</Typography>
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
