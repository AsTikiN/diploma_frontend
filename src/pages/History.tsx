import { styled } from "@mui/material";
import React from "react";
import HistoryCard from "../components/Card/HistoryCard";

const History = () => {
  return (
    <Wrapper>
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  paddingBottom: "100px",
});

export default History;
