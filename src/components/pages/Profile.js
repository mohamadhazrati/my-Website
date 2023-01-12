import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import styl from "../cssStyles/profile.module.css";

const Profile = () => {
  const { data, error } = useSelector((state) => state.profile);

  return (
    <div className={styl.min}>
      {error ? (
        <h1>{error}</h1>
      ) : Object.keys(data).length ? (
        <div className={styl.div1}>
          <Card className={styl.fcard}>
            <Card.Body className={styl.cbody}>
              <p className={styl.div1}>
                <Card.Img
                  variant="top"
                  src={data.user.image}
                  className={styl.cImg}
                />
              </p>

              <Card.Title>Profile Details</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush" id={styl.forlg}>
              <ListGroup.Item>
                Email: <span className={styl.rblue}>{data.user.email}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                User name:{" "}
                <span className={styl.rblue}>{data.user.username}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Mobile: <span className={styl.rblue}>{data.user.mobile}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                First name:{" "}
                <span className={styl.rblue}>
                  {data.user?.firstname ? data.user?.firstname : "not set"}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Last name:{" "}
                <span className={styl.rblue}>
                  {data.user?.lastname ? data.user?.lastname : "not set"}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Gender:{" "}
                <span className={styl.rblue}>
                  {data.user?.gender ? data.user?.gender : "not set"}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Age:{" "}
                <span className={styl.rblue}>
                  {data.user?.age ? data.user?.age : "not set"}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                City:{" "}
                <span className={styl.rblue}>
                  {data.user?.city ? data.user?.city : "not set"}
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
