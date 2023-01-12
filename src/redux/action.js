import axios from "axios";

export const getAllProduct = () => async (dispatch) => {
  dispatch({
    type: "loadingAll",
    payLoad: { data: [], loading: true, error: "" },
  });
  try {
    const { data } = await axios.get("http://kzico.runflare.run/product/");
    dispatch({
      type: "successAll",
      payLoad: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    const hError = error?.response?.data?.message;
    dispatch({
      type: "failedAll",
      payLoad: { data: [], loading: false, error: hError },
    });
  }
};

export const getOneProduct = (id) => async (dispatch) => {
  dispatch({
    type: "loadingOne",
    payLoad: { data: {}, loading: true, error: "" },
  });
  try {
    const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);
    dispatch({
      type: "successOne",
      payLoad: { data: { ...data }, loading: false, error: "" },
    });
  } catch (error) {
    const pError = error?.response?.data?.message;
    dispatch({
      type: "failedOne",
      payLoad: { data: {}, loading: false, error: pError },
    });
  }
};

export const getCart = (obj) => (dispatch, getState) => {
  const lastState = getState().cart;

  if (!lastState.length) {
    const help = JSON.parse(JSON.stringify(obj));
    help.qty = 1;
    const data = [...lastState, help];
    dispatch({
      type: "successCart",
      payLoad: [...data],
    });
    localStorage.setItem("cart", JSON.stringify(data));
  } else {
    const tekrari = lastState.find((item) => item._id === obj._id);
    if (tekrari) {
      lastState.map((item) => {
        if (item._id === tekrari._id && item.qty < item.countInStock) {
          return (item.qty = item.qty + 1);
        } else {
          return "";
        }
      });
      dispatch({
        type: "qtyCart",
        payLoad: [...lastState],
      });
      localStorage.setItem("cart", JSON.stringify(lastState));
    } else {
      const help = JSON.parse(JSON.stringify(obj));
      help.qty = 1;
      const data = [...lastState, help];
      dispatch({
        type: "successCart",
        payLoad: [...data],
      });
      localStorage.setItem("cart", JSON.stringify(data));
    }
  }
};

export const getSignUp =
  (userName, email, password, mobile) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: userName,
          email: email,
          password: password,
          mobile: mobile,
        }
      );
      dispatch({
        type: "successSignUp",
        payLoad: { data: { ...data }, error: "" },
      });
    } catch (error) {
      const sError = error?.response?.data;
      dispatch({
        type: "errorSignUp",
        payLoad: { data: {}, error: sError },
      });
    }
  };

export const getLogIn = (email, password) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("http://kzico.runflare.run/user/login", {
      email: email,
      password: password,
    });
    dispatch({
      type: "successLogIn",
      payLoad: { data: { ...data }, error: "" },
    });
  } catch (error) {
    const lError = error?.response?.data?.message;
    dispatch({
      type: "errorLogIn",
      payLoad: { data: {}, error: lError },
    });
  }
};

export const submiting =
  (order, address, city, postal, phone, total, token) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: order,
          shippingAddress: {
            address: address,
            city: city,
            postalCode: postal,
            phone: phone,
          },
          paymentMethod: "cash",
          shippingPrice: 5,
          totalPrice: total,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "successSubmit",
        payLoad: { sbmData: { ...data }, sbmError: "" },
      });
    } catch (error) {
      dispatch({
        type: "errorSubmit",
        payLoad: { sbmData: {}, sbmError: error },
      });
    }
  };

export const getProfile = (token) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("http://kzico.runflare.run/user/profile", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "successPro",
      payLoad: { data: { ...data }, error: "" },
    });
  } catch (error) {
    const pError = error.response?.data.message;
    dispatch({
      type: "errorPro",
      payLoad: { data: {}, error: pError },
    });
  }
};

export const getAllOrders = (token) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("http://kzico.runflare.run/order/", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "successAllOrders",
      payLoad: { allOrdData: [...data], allOrdError: "" },
    });
  } catch (error) {
    dispatch({
      type: "errorAllOrders",
      payLoad: { allOrdData: [], allOrdError: error },
    });
  }
};

export const getOneOrder = (orderId, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://kzico.runflare.run/order/${orderId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "successOneOrder",
      payLoad: { oneOrdData: { ...data }, oneOrdError: "" },
    });
  } catch (error) {
    dispatch({
      type: "errorOneOrder",
      payLoad: { oneOrdData: {}, oneOrdError: error },
    });
  }
};

export const changePass =
  (oldPass, newPass, token) => async (dispatch, getState) => {
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: oldPass,
          new_password: newPass,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const help = data.message;
      dispatch({
        type: "successChngPass",
        payLoad: { chngPassData: help, chngPassError: "" },
      });
    } catch (error) {
      const help2 = error?.response?.data?.message;
      dispatch({
        type: "errorChngPass",
        payLoad: { chngPassData: "", chngPassError: help2 },
      });
    }
  };

export const changeProfile =
  (firstName, lastName, gender, age, city, token) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: firstName,
          lastname: lastName,
          gender: gender,
          age: age,
          city: city,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const help = data.message;
      dispatch({
        type: "successChngProf",
        payLoad: { chngProfData: help, chngProfError: "" },
      });
    } catch (error) {
      dispatch({
        type: "errorChngProf",
        payLoad: { chngProfData: "", chngProfError: error },
      });
    }
  };

export const uploadPhoto = (pic, token) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append("profile-image", pic);
  try {
    const { data } = await axios.post(
      "http://kzico.runflare.run/user/profile-image",
      formData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const help = data.message;
    dispatch({
      type: "successUplPhoto",
      payLoad: { uplPhotoData: help, uplPhotoError: "" },
    });
  } catch (error) {
    const help2 = error?.response?.data?.message;
    dispatch({
      type: "errorUplPhoto",
      payLoad: { uplPhotoData: "", uplPhotoError: help2 },
    });
  }
};
