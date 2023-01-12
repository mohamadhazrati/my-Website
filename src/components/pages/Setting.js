import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import styl from "../cssStyles/setting.module.css";

const Setting = () => {
  const navigate = useNavigate();

  return (
    <div className={styl.div1}>
      <div className={styl.div2}>
        <Card className={styl.fcard}>
          <Card.Header>
            <Card.Title>Setting</Card.Title>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <button
                className={styl.fbutt}
                onClick={() => {
                  navigate("changePassword");
                }}
              >
                Change Password
              </button>
            </ListGroup.Item>
            <ListGroup.Item>
              <button
                className={styl.fbutt}
                onClick={() => {
                  navigate("changeProfile");
                }}
              >
                Change Profile
              </button>
            </ListGroup.Item>
            <ListGroup.Item>
              <button
                className={styl.fbutt}
                onClick={() => {
                  navigate("uploadPhoto");
                }}
              >
                Upload Photo
              </button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <div className={styl.div3}>
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
