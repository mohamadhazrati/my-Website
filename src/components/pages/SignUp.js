import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSignUp } from "../../redux/action";
import Swal from "sweetalert2";
import styl from "../cssStyles/signup.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.signUp);

  const [email, setEmail] = useState({
    value: "",
    error: "email is Not valid",
    isTouched: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: "password is Not valid",
    isTouched: false,
  });
  const [confPass, setConfPass] = useState({
    value: "",
    error: "confirmation failed",
    isTouched: false,
  });
  const [userName, setUserName] = useState({
    value: "",
    error: "username is Not valid",
    isTouched: false,
  });
  const [mobile, setMobile] = useState({
    value: "",
    error: "mobile is Not valid",
    isTouched: false,
  });

  const emRegex = function () {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (reg.test(email.value)) {
      return true;
    } else {
      return false;
    }
  };

  const passRegex = function () {
    const reg =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (reg.test(password.value)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      Swal.fire(data.message);
      navigate("/login", {
        state: {
          emailS: email?.value,
          passwordS: password?.value,
        },
      });
      dispatch({ type: "delSignUp", payLoad: { data: {}, error: "" } });
    } else if (Object.keys(error).length) {
      if (error.message.length == 3) {
        Swal.fire(error.message[0], error.message[1], error.message[2]);
      } else if (error.message.length == 2) {
        Swal.fire(error.message[0], error.message[1]);
      } else if (error.message.length == 1) {
        Swal.fire(error.message[0]);
      } else {
        Swal.fire(error.message);
      }
      dispatch({ type: "delSignUp", payLoad: { data: {}, error: "" } });
    }
  }, [data, error]);

  return (
    <div className={styl.div1}>
      <div className={styl.div2}>
        <h3>Sign Up</h3>
        <p>
          Already Registered?{" "}
          <span className={styl.rblueIt} onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>
        <Form noValidate onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    required
                    onChange={(e) =>
                      setUserName((last) => {
                        const help = { ...last };
                        help.value = e.target.value;
                        help.value = help.value.trim();
                        return { ...help };
                      })
                    }
                    onBlur={() => {
                      setUserName((last) => {
                        const help = { ...last };
                        help.isTouched = true;
                        return { ...help };
                      });
                    }}
                    onFocus={() =>
                      setUserName((last) => {
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
              {!/^([a-zA-Z0-9])([\w\-]{4,20})$/.test(userName.value) &&
                userName.isTouched && (
                  <span className={styl.redIt}>{userName.error}</span>
                )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) =>
                      setEmail((last) => {
                        const help = { ...last };
                        help.value = e.target.value;
                        help.value = help.value.trim();
                        return { ...help };
                      })
                    }
                    onBlur={() => {
                      if (!emRegex()) {
                        setEmail((last) => {
                          const help = { ...last };
                          help.isTouched = true;
                          help.value = "";
                          return { ...help };
                        });
                      }
                    }}
                    onFocus={() =>
                      setEmail((last) => {
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
              {!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value) &&
                email.isTouched && (
                  <span className={styl.redIt}>{email.error}</span>
                )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setPassword((last) => {
                        const help = { ...last };
                        help.value = e.target.value;
                        help.value = help.value.trim();
                        return { ...help };
                      })
                    }
                    onBlur={() => {
                      if (!passRegex()) {
                        setPassword((last) => {
                          const help = { ...last };
                          help.isTouched = true;
                          help.value = "";
                          return { ...help };
                        });
                      }
                    }}
                    onFocus={() =>
                      setPassword((last) => {
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
              {!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                password.value
              ) &&
                password.isTouched && (
                  <span className={styl.redIt}>{password.error}</span>
                )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) =>
                      setConfPass((last) => {
                        const help = { ...last };
                        help.value = e.target.value;
                        help.value = help.value.trim();
                        return { ...help };
                      })
                    }
                    onBlur={() =>
                      setConfPass((last) => {
                        const help = { ...last };
                        help.isTouched = true;
                        return { ...help };
                      })
                    }
                    onFocus={() =>
                      setConfPass((last) => {
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
              {password.value !== confPass.value && confPass.isTouched && (
                <span className={styl.redIt}>{confPass.error}</span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMobile">
            <Form.Label>Mobile</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Mobile Number"
                    required
                    onChange={(e) =>
                      setMobile((last) => {
                        const help = { ...last };
                        help.value = e.target.value;
                        help.value = help.value.trim();
                        return { ...help };
                      })
                    }
                    onBlur={() => {
                      setMobile((last) => {
                        const help = { ...last };
                        help.isTouched = true;
                        return { ...help };
                      });
                    }}
                    onFocus={() =>
                      setMobile((last) => {
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
              {!/^09[0-9]{9}$/.test(mobile.value) && mobile.isTouched && (
                <span className={styl.redIt}>{mobile.error}</span>
              )}
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styl.mb3}
            onClick={() => {
              if (
                userName.value &&
                email.value &&
                password.value &&
                confPass.value &&
                mobile.value
              ) {
                dispatch(
                  getSignUp(
                    userName.value,
                    email.value,
                    password.value,
                    mobile.value
                  )
                );
              }
            }}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
