import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import {
  allProduct,
  oneProduct,
  cart,
  signUp,
  logIn,
  submitingR,
  profile,
  allOrders,
  oneOrder,
  chngPass,
  chngProfile,
  uplPhoto,
} from "./reducer";
const reducers = combineReducers({
  allProduct,
  oneProduct,
  cart,
  signUp,
  logIn,
  submitingR,
  profile,
  allOrders,
  oneOrder,
  chngPass,
  chngProfile,
  uplPhoto,
});
const middleware = [thunk];
const cartData = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = { cart: cartData };
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
