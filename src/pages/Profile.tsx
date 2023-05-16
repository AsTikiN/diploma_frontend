import { Typography, styled } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src="https://koldunov.com/wp-content/uploads/2020/10/passport_photo2-713x1024.jpg"
          alt="profile photo"
        />
      </ImageWrapper>
      <Info>
        <Typography variant="h6" fontWeight={"700"}>
          Name: Vasiliy
        </Typography>
        <Typography variant="h6" fontWeight={"700"}>
          Email: VasiliyTest@gmail.com
        </Typography>
        <Typography variant="h6" fontWeight={"700"}>
          Password: 12345678
        </Typography>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled("div")({});
const Info = styled("div")({
  padding: "0 30px",
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const ImageWrapper = styled("div")({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "0 auto",
  boxShadow: "0 0 100px 1px #c4c4c4",
  marginTop: "60px",
});

const Image = styled("img")({
  width: "200px",
});

export default Profile;
