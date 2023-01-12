import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { submiting } from "../../redux/action";
import Swal from "sweetalert2";
import styl from "../cssStyles/check.module.css";

const Check = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const city = location.state?.city;
  const address = location.state?.address;
  const postal = location.state?.postal;
  const phone = location.state?.phone;
  const data = useSelector((state) => state.cart);
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
  const [order, setOrder] = useState([]);
  const { sbmData, sbmError } = useSelector((state) => state.submitingR);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (data.length) {
      data.map((item) => {
        const help = {};
        help.product = item._id;
        help.qty = item.qty;
        setOrder((last) => [...last, help]);
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(sbmData).length) {
      setShow(false);
      localStorage.removeItem("cart");
      dispatch({
        type: "clearCart",
        payLoad: [],
      });
      dispatch({
        type: "delSubmit",
        payLoad: { sbmData: {}, sbmError: "" },
      });
    } else if (Object.keys(sbmError).length) {
      const error = sbmError?.response?.data?.message;
      if (error.length === 4) {
        Swal.fire(`${error[0]} , ${error[1]} , ${error[2]} , ${error[3]}`);
      } else if (error.length === 3) {
        Swal.fire(`${error[0]} , ${error[1]} , ${error[2]}`);
      } else if (error.length === 2) {
        Swal.fire(`${error[0]} , ${error[1]}`);
      } else {
        Swal.fire(error[0]);
      }
      dispatch({
        type: "delSubmit",
        payLoad: { sbmData: {}, sbmError: "" },
      });
    }
  }, [sbmData, sbmError]);

  return (
    <div className={styl.min}>
      {show ? (
        <div>
          <div>
            <div className={styl.div1}>
              <h1>| Check Out |</h1>
              <Container className="mt-5">
                {data.length ? (
                  data.map((item) => {
                    return (
                      <Row key={item._id} className={styl.forRow}>
                        <Col>
                          <img
                            className={styl.forImg}
                            src={item.image}
                            alt="product"
                          />
                        </Col>
                        <Col>
                          <div className={styl.div2}>{item.name}</div>
                        </Col>
                        <Col>
                          <div className={styl.div3}>Price: {item.price} $</div>
                        </Col>
                        <Col>
                          <div className={styl.div3}></div>
                        </Col>
                        <Col>
                          <div className={styl.div4}>
                            <Button variant="info">{item.qty}</Button>
                          </div>
                        </Col>
                      </Row>
                    );
                  })
                ) : (
                  <h3 className="mt-5">Cart is Empty! Push the cart </h3>
                )}
              </Container>

              {data.length ? (
                <div className={styl.div5}>Total Price: {totalPrice} $</div>
              ) : (
                ""
              )}
            </div>
            {data.length ? (
              <Card className={styl.forCard}>
                <Card.Header>Delivery Details</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    City:{" "}
                    <span className={styl.lblueIt}>{city ? city : ""}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Address:{" "}
                    <span className={styl.lblueIt}>
                      {address ? address : ""}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Postal Code:{" "}
                    <span className={styl.lblueIt}>{postal ? postal : ""}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phone Number:{" "}
                    <span className={styl.lblueIt}>{phone ? phone : ""}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ) : (
              ""
            )}
          </div>
          {data.length ? (
            <div className={styl.div6}>
              <Button
                className={styl.ml10}
                onClick={() => {
                  navigate("/cart");
                  dispatch({
                    type: "delSubmit",
                    payLoad: { sbmData: {}, sbmError: "" },
                  });
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  if (!Object.keys(sbmData).length) {
                    dispatch(
                      submiting(
                        order,
                        address,
                        city,
                        postal,
                        phone,
                        totalPrice,
                        token
                      )
                    );
                  }
                }}
              >
                Submit
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={styl.divh1}>
          <h1>Your order has been registered✔</h1>
        </div>
      )}
    </div>
  );
};

export default React.memo(Check);
