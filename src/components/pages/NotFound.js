import React from "react";
import styl from "../cssStyles/changing.module.css";

const NotFound = () => {
  return (
    <div className={styl.notFound}>
      <img
        src="https://static.vecteezy.com/system/resources/previews/001/857/111/non_2x/error-404-page-not-found-landing-page-concept-for-mobile-and-pc-free-vector.jpg"
        alt="404 not found page"
        className={styl.notImg}
      />
    </div>
  );
};

export default NotFound;
