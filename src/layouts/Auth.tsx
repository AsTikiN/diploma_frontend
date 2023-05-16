import { styled } from "@mui/material";
import React from "react";
import Logo from "../components/Logo/Logo";

interface Props {
  children: React.ReactNode;
}

const Auth = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      {children}
    </Wrapper>
  );
};

const Header = styled("div")({
  position: "fixed",
  width: "100%",
  top: "30px",
  left: "20px",

  "& > div": { color: "#000 !important" },
});

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  padding: "0 20px",
  margin: "0 auto",
});

export default Auth;
