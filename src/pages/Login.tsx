import { Button, TextField, Typography } from "@mui/material";
import Auth from "../layouts/Auth";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (setter: any) => (e: any) => setter(e.target.value);

  const handleSubmit = () => {
    if (!email || !password) {
      toast("All fields are required!", { type: "error" });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast("Incorrect email!", { type: "error" });
      return;
    }

    if (password.length < 8) {
      toast("Password should contain 8 or more symbols!", { type: "error" });
      return;
    }

    toast("Login succesfully!", { type: "success" });
    navigate("/");
  };

  return (
    <Auth>
      <Wrapper>
        <Typography variant="h3">Login</Typography>
        <TextField
          value={email}
          onChange={handleChange(setEmail)}
          fullWidth
          label="email"
        />
        <TextField
          value={password}
          onChange={handleChange(setPassword)}
          fullWidth
          label="password"
          type="password"
        />
        <Register onClick={() => navigate("/register")}>Register</Register>
        <Button
          onClick={handleSubmit}
          sx={{ mt: "10px" }}
          variant="contained"
          fullWidth
        >
          Login
        </Button>
      </Wrapper>
    </Auth>
  );
};

const Wrapper = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "30px",
  width: "100%",
});

const Register = styled("div")({
  textAlign: "right",
  width: "100%",
  position: "absolute",
  top: "230px",
  color: "#1976d2",
  textDecoration: "underline",
});

export default LoginPage;