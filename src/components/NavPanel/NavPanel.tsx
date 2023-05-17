import { Box, styled } from "@mui/material";
import React from "react";
import ProfileUser from "../../images/profile-user";
import LoginIcon from "../../images/login";
import HomeIcon from "../../images/home";
import History from "../../images/history";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getIsAuthorized } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NavPanel = () => {
  const isAuthorized = useSelector(getIsAuthorized);
  const navigate = useNavigate();
  const location = useLocation();

  const onNav = (route: string) => () => {
    if (!isAuthorized) {
      navigate("/login");
      toast("You must be logined!", { type: "error" });
      return;
    }
    navigate(route);
  };

  return (
    <Wrapper>
      <Box sx={{ cursor: "pointer" }} onClick={onNav("/home")}>
        <HomeIcon />
      </Box>
      <Box sx={{ cursor: "pointer" }} onClick={onNav("/history")}>
        <History />
      </Box>
      <Box sx={{ cursor: "pointer" }} onClick={onNav("/profile")}>
        <ProfileUser />
      </Box>
      <Box sx={{ cursor: "pointer" }} onClick={onNav("/login")}>
        <LoginIcon />
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  position: "fixed",
  bottom: 0,
  borderRadius: "20px 20px 0 0",
  boxShadow: "-10px 0 100px 1px #c4c4c4",
  width: "100%",
  padding: "20px",
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#fff",
});

export default NavPanel;
