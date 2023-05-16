import { Avatar, Box, Card, Chip, Typography, styled } from "@mui/material";
import React from "react";

const HistoryCard = () => {
  return (
    <StyledCard variant="elevation">
      <Box display="flex" alignItems="center" gap="20px">
        <Avatar />
        <Typography variant="h6">Driver: Alexandr</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        justifyContent="space-between"
        mt={1.5}
      >
        <Box>
          <Typography variant="h6">Distance: 6.2 km</Typography>
          <Typography variant="h6">Cost: 120 GRN</Typography>
        </Box>
        <Chip label="completed" color="success" variant="outlined" />
      </Box>
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  padding: "20px",
});

export default HistoryCard;
