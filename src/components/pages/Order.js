import React, { useEffect } from "react";
import { Button, Card, ListGroup, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneOrder } from "../../redux/action";
import styl from "../cssStyles/order.module.css";

const Order = ({ token }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { oneOrdData, oneOrdError } = useSelector((state) => state.oneOrder);

  useEffect(() => {
    dispatch(getOneOrder(params.orderId, token));
  }, []);

  return (
    <div className={styl.min}>
      {Object.keys(oneOrdData).length ? (
        <div>
          <div className={styl.fcard}>
            <Card>
              <Card.Header>
                All Products items:{" "}
                <span className={styl.rblue}>
                  {oneOrdData.orderItems.length}
                </span>{" "}
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Address:{" "}
                  <span className={styl.rblue}>
                    {oneOrdData.shippingAddress.address}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Phone number:{" "}
                  <span className={styl.rblue}>
                    {oneOrdData.shippingAddress.phone}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Postal code:{" "}
                  <span className={styl.rblue}>
                    {oneOrdData.shippingAddress.postalCode}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  City:{" "}
                  <span className={styl.rblue}>
                    {oneOrdData.shippingAddress.city}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Shipping price:{" "}
                  <span className={styl.rblue}>
                    {oneOrdData.shippingPrice} $
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Total price:{" "}
                  <span className={styl.rblue}>{oneOrdData.totalPrice} $</span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
          <div className={styl.fdiv}>
            <Container className="mt-5">
              {oneOrdData.orderItems.length ? (
                oneOrdData.orderItems.map((item) => {
                  return (
                    <Row key={item._id} className={styl.frow}>
                      <Col>
                        <img
                          className={styl.fimg}
                          src={item.product.image}
                          alt="product"
                        />
                      </Col>
                      <Col>
                        <div className={styl.fdiv1}>{item.product.name}</div>
                      </Col>
                      <Col>
                        <div className={styl.fdiv2}>
                          Price: {item.product.price} $
                        </div>
                      </Col>
                      <Col>
                        <div className={styl.fdiv3}>
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
          </div>
        </div>
      ) : (
        <h1>{oneOrdError?.response?.data?.message}</h1>
      )}
    </div>
  );
};

export default React.memo(Order);
