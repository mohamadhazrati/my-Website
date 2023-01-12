import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "../../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import styl from "../cssStyles/home.module.css";

const Users = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.allProduct);
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);
  const navigate = useNavigate();

  return (
    <div className={styl.min}>
      {loading ? (
        <Spinner animation="border" variant="info" />
      ) : (
        error && <h1>{error}</h1>
      )}
      <Container>
        <Row>
          {data.slice(14, 25).map((item) => {
            return (
              <Col
                key={item._id}
                md={{ span: 4, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                xs={{ span: 8, offset: 2 }}
                className={styl.mgt}
              >
                <Card
                  className={styl.card}
                  onClick={() => navigate(`product/${item._id.toString()}`)}
                >
                  <button className={styl.dokme}>
                    <Card.Img
                      className={styl.cardImg}
                      variant="top"
                      src={item.image}
                      alt="product image"
                    />
                  </button>
                  <Card.Body className={styl.cardBody}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text
                      style={{
                        color: item.countInStock ? "green" : "red",
                      }}
                    >
                      {item.countInStock
                        ? `Available: ${item.countInStock}`
                        : `Not Available: ${item.countInStock}`}
                    </Card.Text>
                    <Card.Text className={styl.cardText}>
                      <span>
                        price:{" "}
                        <span className={styl.blueIt}>
                          {item.price}
                          <FontAwesomeIcon
                            icon={faDollarSign}
                            className={styl.ml3}
                          />
                        </span>
                      </span>
                      <span>
                        rating:{" "}
                        <span className={styl.blueIt}>
                          {item.rating}
                          <FontAwesomeIcon icon={faStar} className={styl.ml3} />
                        </span>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Users;
