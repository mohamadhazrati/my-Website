import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styl from "../cssStyles/address.module.css";

const Address = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState({
    value: "",
    error: "city is Not valid",
    isTouched: false,
  });
  const [address, setAddress] = useState({
    value: "",
    error: "address is Not valid",
    isTouched: false,
  });
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState({
    value: "",
    error: "phone is Not valid",
    isTouched: false,
  });

  return (
    <div className={styl.div1}>
      <Card className={styl.forCard}>
        <Card.Header className={styl.lblueIt}>Delivery Details</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Container>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="city"
                      required
                      onChange={(e) =>
                        setCity((last) => {
                          const help = { ...last };
                          help.value = e.target.value;
                          help.value = help.value.trim();
                          return { ...help };
                        })
                      }
                      onBlur={() => {
                        setCity((last) => {
                          const help = { ...last };
                          help.isTouched = true;
                          return { ...help };
                        });
                      }}
                      onFocus={() =>
                        setCity((last) => {
                          const help = { ...last };
                          help.isTouched = false;
                          return { ...help };
                        })
                      }
                    />
                  </Col>
                </Row>
              </Container>
              <Form.Text>
                {!/^([a-zA-Z0-9\s])([\w\-\s]{1,15})$/.test(city.value) &&
                  city.isTouched && (
                    <span className={styl.redIt}>{city.error}</span>
                  )}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Container>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="address"
                      required
                      onChange={(e) =>
                        setAddress((last) => {
                          const help = { ...last };
                          help.value = e.target.value;
                          help.value = help.value.trim();
                          return { ...help };
                        })
                      }
                      onBlur={() => {
                        setAddress((last) => {
                          const help = { ...last };
                          help.isTouched = true;
                          return { ...help };
                        });
                      }}
                      onFocus={() =>
                        setAddress((last) => {
                          const help = { ...last };
                          help.isTouched = false;
                          return { ...help };
                        })
                      }
                    />
                  </Col>
                </Row>
              </Container>
              <Form.Text>
                {!/^([a-zA-Z0-9\s])([\w\-\s]{9,55})$/.test(address.value) &&
                  address.isTouched && (
                    <span className={styl.redIt}>{address.error}</span>
                  )}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Container>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="postal code"
                      required
                      onChange={(e) =>
                        setPostal((last) => {
                          let help = JSON.parse(JSON.stringify(last));
                          help = e.target.value;
                          help = help.trim();
                          return help;
                        })
                      }
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Container>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="phone number"
                      required
                      onChange={(e) =>
                        setPhone((last) => {
                          const help = { ...last };
                          help.value = e.target.value;
                          help.value = help.value.trim();
                          return { ...help };
                        })
                      }
                      onBlur={() => {
                        setPhone((last) => {
                          const help = { ...last };
                          help.isTouched = true;
                          return { ...help };
                        });
                      }}
                      onFocus={() =>
                        setPhone((last) => {
                          const help = { ...last };
                          help.isTouched = false;
                          return { ...help };
                        })
                      }
                    />
                  </Col>
                </Row>
              </Container>
              <Form.Text>
                {!/^09[0-9]{9}$/.test(phone.value) && phone.isTouched && (
                  <span className={styl.redIt}>{phone.error}</span>
                )}
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                if (city.value && address.value && postal && phone.value) {
                  navigate("/check", {
                    state: {
                      city: city.value,
                      address: address.value,
                      postal: postal,
                      phone: phone.value,
                    },
                  });
                }
              }}
            >
              Check Out
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className={styl.lblueIt}>Welcome</Card.Footer>
      </Card>
    </div>
  );
};

export default Address;
