export const allProduct = (
  state = { data: [], loading: false, error: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "loadingAll":
      return payLoad;
    case "successAll":
      return payLoad;
    case "failedAll":
      return payLoad;
    default:
      return state;
  }
};

export const oneProduct = (
  state = { data: {}, loading: false, error: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "loadingOne":
      return payLoad;
    case "successOne":
      return payLoad;
    case "failedOne":
      return payLoad;
    default:
      return state;
  }
};

export const cart = (state = [], { type, payLoad }) => {
  switch (type) {
    case "successCart":
      return payLoad;
    case "qtyCart":
      return payLoad;
    case "plusQtyCart":
      return payLoad;
    case "minusQtyCart":
      return payLoad;
    case "removeACart":
      return payLoad;
    case "clearCart":
      return payLoad;
    default:
      return state;
  }
};

export const signUp = (state = { data: {}, error: "" }, { type, payLoad }) => {
  switch (type) {
    case "successSignUp":
      return payLoad;
    case "errorSignUp":
      return payLoad;
    case "delSignUp":
      return payLoad;
    default:
      return state;
  }
};

export const logIn = (state = { data: {}, error: "" }, { type, payLoad }) => {
  switch (type) {
    case "successLogIn":
      return payLoad;
    case "errorLogIn":
      return payLoad;
    case "delLogIn":
      return payLoad;
    default:
      return state;
  }
};

export const submitingR = (
  state = { sbmData: {}, sbmError: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "successSubmit":
      return payLoad;
    case "errorSubmit":
      return payLoad;
    case "delSubmit":
      return payLoad;
    default:
      return state;
  }
};

export const profile = (state = { data: {}, error: "" }, { type, payLoad }) => {
  switch (type) {
    case "successPro":
      return payLoad;
    case "errorPro":
      return payLoad;
    case "delPro":
      return payLoad;
    default:
      return state;
  }
};

export const allOrders = (
  state = { allOrdData: [], allOrdError: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "successAllOrders":
      return payLoad;
    case "errorAllOrders":
      return payLoad;
    default:
      return state;
  }
};

export const oneOrder = (
  state = { oneOrdData: {}, oneOrdError: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "successOneOrder":
      return payLoad;
    case "errorOneOrder":
      return payLoad;
    default:
      return state;
  }
};

export const chngPass = (
  state = { chngPassData: "", chngPassError: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "successChngPass":
      return payLoad;
    case "errorChngPass":
      return payLoad;
    case "delChngPass":
      return payLoad;
    default:
      return state;
  }
};

export const chngProfile = (
  state = { chngProfData: "", chngProfError: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "successChngProf":
      return payLoad;
    case "errorChngProf":
      return payLoad;
    case "delChngProf":
      return payLoad;
    default:
      return state;
  }
};

export const uplPhoto = (
  state = { uplPhotoData: "", uplPhotoError: "" },
  { type, payLoad }
) => {
  switch (type) {
    case "successUplPhoto":
      return payLoad;
    case "errorUplPhoto":
      return payLoad;
    case "delUplPhoto":
      return payLoad;
    default:
      return state;
  }
};
