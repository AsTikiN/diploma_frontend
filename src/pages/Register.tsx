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
      toast("Усі поля є обов'язковими!", { type: "error" });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast("Помилка при введенні пошти!", { type: "error" });
      return;
    }

    if (password.length < 8) {
      toast("Пароль має складатись з 8 та більше символів!", { type: "error" });
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
      toast("Аккаует успішно створено!", { type: "success" });
      navigate("/login");
    } catch (e: any) {
      toast(e.response.data, { type: "error" });
    }
  };

  return (
    <Auth>
      <Wrapper>
        <Typography variant="h3">Реєстрація</Typography>
        <TextField
          value={name}
          onChange={handleChange(setName)}
          fullWidth
          label="Ім'я користувача"
        />
        <TextField
          value={email}
          onChange={handleChange(setEmail)}
          fullWidth
          label="Пошта"
        />
        <TextField
          value={password}
          onChange={handleChange(setPassword)}
          fullWidth
          label="Пароль"
          type="password"
        />
        <FormControlLabel
          sx={{ width: "100%", position: "absolute", top: "315px" }}
          control={<Checkbox />}
          label="Акаунт водія"
          value={driver}
          onChange={() => setDriver(!driver)}
        />
        <Login onClick={() => navigate("/login")}>Увійти</Login>
        <Button
          onClick={handleSubmit}
          sx={{ mt: "10px" }}
          variant="contained"
          fullWidth
        >
          Зареєструватися
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
