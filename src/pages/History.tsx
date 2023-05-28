import { Card, Typography, styled, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import HistoryCard from "../components/Card/HistoryCard";
import { useSelector } from "react-redux";
import { getRights, getUserId } from "../redux/reducers/authReducer";
import axios from "axios";
import { baseUrl, drive } from "../axiosConfig";
import { toast } from "react-toastify";
import ImageIcon from "@mui/icons-material/Image";

const History = () => {
  const [history, setHistory] = useState([]);
  const userId = useSelector(getUserId);
  const rights = useSelector(getRights);
  const rightsField = rights === "driver" ? "driverId" : "userId";

  const getHistory = async () => {
    try {
      const drives: any = await axios.get(baseUrl + drive + "/all");
      setHistory(
        drives.data.filter((drive: any) => drive[rightsField] === userId)
      );
    } catch (e) {
      toast("Error while getting history!", { type: "error" });
    }
  };

  console.log(history);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Wrapper>
      {!history.length && (
        <Box
          sx={{
            height: "calc(100vh - 100px)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageIcon sx={{ color: "text.tertiary", fontSize: "250px" }} />
          <div>
            <Typography variant="h5" mt={2}>
              You didn't have any rides yet!
            </Typography>
          </div>
        </Box>
      )}
      {history.map((item: any) => (
        <HistoryCard
          key={item._id}
          data={{ ...item, status: "completed" }}
          rightsField={rightsField}
        />
      ))}
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
