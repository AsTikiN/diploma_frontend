import { styled } from "@mui/material";
import React from "react";
import ProfileUser from "../../images/profile-user";
import LoginIcon from "../../images/login";
import HomeIcon from "../../images/home";
import History from "../../images/history";
import { Link } from "react-router-dom";

const NavPanel = () => {
  return (
    <Wrapper>
      <Link to="/">
        <HomeIcon />
      </Link>
      <Link to="/history">
        <History />
      </Link>
      <Link to="/profile">
        <ProfileUser />
      </Link>
      <Link to="/login">
        <LoginIcon />
      </Link>
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
