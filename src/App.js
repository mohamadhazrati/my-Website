import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import NotFound from "./components/pages/NotFound";
import Cart from "./components/pages/Cart";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Address from "./components/pages/Address";
import { useDispatch, useSelector } from "react-redux";
import Check from "./components/pages/Check";
import Profile from "./components/pages/Profile";
import Order from "./components/pages/Order";
import OrdersAll from "./components/pages/OrdersAll";
import Setting from "./components/pages/Setting";
import ChangePassword from "./components/pages/ChangePassword";
import { getProfile } from "./redux/action";
import ChangeProfile from "./components/pages/ChangeProfile";
import UploadPhoto from "./components/pages/UploadPhoto";

function App() {
  const dispatch = useDispatch();
  const locUser = JSON.parse(localStorage.getItem("user")) ?? false;
  const token = locUser ? locUser?.token : locUser;
  const [isLogIn, setIsLogIn] = useState(false);
  const cart = useSelector((state) => state.cart);
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
  const { data, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile(token));
  }, []);

  useEffect(() => {
    if (error) {
      setIsLogIn(false);
      dispatch({ type: "delPro", payLoad: { data: {}, error: "" } });
    }
  }, [error]);

  useEffect(() => {
    if (token) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  }, [token]);

  return (
    <div className="App">
      <Header setIsLogIn={setIsLogIn} isLogIn={isLogIn} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart isLogIn={isLogIn} />} />
        <Route
          path="/login"
          element={isLogIn ? <NotFound /> : <Login setIsLogIn={setIsLogIn} />}
        />
        <Route path="/signup" element={isLogIn ? <NotFound /> : <SignUp />} />
        <Route
          path="/address"
          element={isLogIn && cart.length ? <Address /> : <NotFound />}
        />
        <Route
          path="/check"
          element={
            isLogIn && totalPrice ? <Check token={token} /> : <NotFound />
          }
        />
        <Route path="/profile" element={isLogIn ? <Profile /> : <NotFound />} />
        <Route
          path="/orders"
          element={isLogIn ? <OrdersAll token={token} /> : <NotFound />}
        />
        <Route
          path="/orders/:orderId"
          element={isLogIn ? <Order token={token} /> : <NotFound />}
        />
        <Route path="/setting" element={isLogIn ? <Setting /> : <NotFound />}>
          <Route
            path="changePassword"
            element={isLogIn ? <ChangePassword token={token} /> : <NotFound />}
          />
          <Route
            path="changeProfile"
            element={isLogIn ? <ChangeProfile token={token} /> : <NotFound />}
          />
          <Route
            path="uploadPhoto"
            element={isLogIn ? <UploadPhoto token={token} /> : <NotFound />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
