import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Auth from "../layouts/Auth";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl, user } from "../axiosConfig";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [driver, setDriver] = useState(false);
  console.log(driver);
  const handleChange = (setter: any) => (e: any) => setter(e.target.value);

  const handleSubmit = () => {
    if (!name || !email || !password) {
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
    console.log(200);
    registerServer();
  };

  const registerServer = async () => {
    try {
      const message = await axios.post(baseUrl + user, {
        name,
        email,
        password,
        rights: driver ? "driver" : "passanger",
      });
      toast("Account succesfully added!", { type: "success" });
      navigate("/login");
    } catch (e: any) {
      toast(e.response.data, { type: "error" });
    }
  };

  return (
    <Auth>
      <Wrapper>
        <Typography variant="h3">Register</Typography>
        <TextField
          value={name}
          onChange={handleChange(setName)}
          fullWidth
          label="name"
        />
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
        <FormControlLabel
          sx={{ width: "100%", position: "absolute", top: "315px" }}
          control={<Checkbox />}
          label="I'm a driver"
          value={driver}
          onChange={() => setDriver(!driver)}
        />
        <Login onClick={() => navigate("/login")}>login</Login>
        <Button
          onClick={handleSubmit}
          sx={{ mt: "10px" }}
          variant="contained"
          fullWidth
        >
          Register
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

const Login = styled("div")({
  textAlign: "right",
  width: "100%",
  position: "absolute",
  top: "320px",
  color: "#1976d2",
  textDecoration: "underline",
});

export default RegisterPage;
