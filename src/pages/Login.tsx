import { Button, TextField, Typography } from "@mui/material";
import Auth from "../layouts/Auth";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ToastContent, toast } from "react-toastify";
import axios from "axios";
import { baseUrl, user } from "../axiosConfig";
import { Rights } from "../types";
import { useDispatch } from "react-redux";
import { setRights, setUserData } from "../redux/actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (setter: any) => (e: any) => setter(e.target.value);

  const handleSubmit = () => {
    if (!email || !password) {
      toast("Заповність усі поля!", { type: "error" });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast("Не вірна пошта!", { type: "error" });
      return;
    }

    if (password.length < 8) {
      toast("Пароль має складатись з 8 та більше символів!", { type: "error" });
      return;
    }
    loginServer();
  };

  const loginServer = async () => {
    try {
      const answer = await axios.get(
        baseUrl + user + "/" + email + "/" + password,
        {
          params: {
            email,
            password,
          },
        }
      );
      const { isAuthorized, rights, id, avatar, name } = answer.data;
      console.log("answer", answer.data);
      if (isAuthorized) {
        toast("Вдала авторизація!", { type: "success" });
        dispatch(setRights(rights, id, true));
        console.log("500", typeof avatar, answer.data.avatar);
        dispatch(setUserData({ email, password, avatar, name }));
        navigate("/");
      }
    } catch (e: any) {
      toast(e.response.data, { type: "error" });
    }
  };

  return (
    <Auth>
      <Wrapper>
        <Typography variant="h3">Авторизація</Typography>
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
        <Register onClick={() => navigate("/register")}>Реєстрація</Register>
        <Button
          onClick={handleSubmit}
          sx={{ mt: "10px" }}
          variant="contained"
          fullWidth
        >
          Увійти
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
