import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/action";
import styl from "../cssStyles/orderAll.module.css";

const OrdersAll = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allOrdData, allOrdError } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders(token));
  }, []);

  return (
    <div className={styl.min}>
      <div className={styl.fdiv1}>
        <h1>| Orders History |</h1>
        <Container className="mt-5">
          {allOrdData.length ? (
            allOrdData.map((item) => {
              return (
                <Row
                  key={item._id}
                  className={styl.frow}
                  onClick={() => {
                    navigate(`/orders/${item._id.toString()}`);
                  }}
                >
                  <Col>
                    <div className={styl.fdiv2}>
                      Products items:{" "}
                      <span className={styl.rblue}>
                        {item.orderItems.length}
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <div className={styl.fdiv3}>
                      {" "}
                      address:{" "}
                      <span className={styl.rblue}>
                        {item.shippingAddress.address}
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <div className={styl.fdiv2}>
                      paymentMethod:{" "}
                      <span className={styl.rblue}>{item.paymentMethod}</span>
                    </div>
                  </Col>
                  <Col>
                    <div className={styl.fdiv4}>
                      <Button variant="info">
                        Total price: {item.totalPrice} $
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            })
          ) : allOrdError ? (
            <h3 className="mt-5">{allOrdError?.response?.data?.message}</h3>
          ) : (
            ""
          )}
        </Container>
      </div>
    </div>
  );
};

export default React.memo(OrdersAll);
