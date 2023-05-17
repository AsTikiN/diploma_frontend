import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getIsAuthorized } from "./redux/reducers/authReducer";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Router = ({ children }: any) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    if (
      !isAuthorized &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [location]);

  return <>{children}</>;
};

export default Router;
