import * as React from "react";
import { styled } from "@mui/material";

const Logo = () => {
  return <Wrapper>Ways builder</Wrapper>;
};

const Wrapper = styled("div")({
  color: "#ffffff",
  textTransform: "uppercase",
  fontFamily: "arial",
  fontWeight: 600,
});

export default Logo;
