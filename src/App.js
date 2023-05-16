import React, { createContext } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./redux/store";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Auth from "./layouts/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import NavPanel from "./components/NavPanel/NavPanel";
import History from "./pages/History";

const firebaseConfig = {
  apiKey: "AIzaSyCiO-Rrn1VDWomqcfomseNDLfN25AJojgs",
  authDomain: "saunter-85c4f.firebaseapp.com",
  projectId: "saunter-85c4f",
  storageBucket: "saunter-85c4f.appspot.com",
  messagingSenderId: "911543812337",
  appId: "1:911543812337:web:f89198d2a582cb3dbae950",
  measurementId: "G-0CETZ1RTQL",
  databaseUrl: "https://saunter-85c4f-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const DatabaseContext = createContext();

function App() {
  return (
    <Provider store={store}>
      <DatabaseContext.Provider value={database}>
        <BrowserRouter>
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/history"} element={<History />} />
            <Route path={"/"} element={<Main />} />
          </Routes>
          <NavPanel />
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        />
      </DatabaseContext.Provider>
    </Provider>
  );
}

export default App;
