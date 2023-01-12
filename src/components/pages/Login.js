import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getLogIn } from "../../redux/action";
import Swal from "sweetalert2";
import styl from "../cssStyles/login.module.css";

const Login = ({ setIsLogIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let emailS = location?.state?.emailS;
  emailS = emailS ? emailS : "";
  let passwordS = location?.state?.passwordS;
  passwordS = passwordS ? passwordS : "";
  const { data, error } = useSelector((state) => state.logIn);

  useEffect(() => {
    if (Object.keys(data).length) {
      setIsLogIn(true);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      dispatch({ type: "delLogIn", payLoad: { data: {}, error: "" } });
    } else if (error) {
      Swal.fire(error);
      dispatch({ type: "delLogIn", payLoad: { data: {}, error: "" } });
    }
  }, [data, error]);

  const [email, setEmail] = useState({
    value: emailS,
  });
  const [password, setPassword] = useState({
    value: passwordS,
    error: "password is Not valid",
    isTouched: false,
  });

  const passRegex = function () {
    const reg =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (reg.test(password.value)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styl.div1}>
      <div className={styl.div2}>
        <h3>Log In</h3>
        <p>
          Not Registered yet?{" "}
          <span className={styl.rblueIt} onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
        <Form noValidate onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email or Username</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="email/username"
                    required
                    value={email?.value}
                    onChange={(e) =>
                      setEmail((last) => {
                        const help = { ...last };
                        help.value = e.target.value;
                        help.value = help.value.trim();
                        return { ...help };
                      })
                    }
                  />
                </Col>
              </Row>
            </Container>
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
                    value={password?.value}
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
              {" "}
              {!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                password.value
              ) &&
                password.isTouched && (
                  <span className={styl.redIt}>{password.error}</span>
                )}
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styl.mb3}
            onClick={() => {
              if (email.value && password.value) {
                dispatch(getLogIn(email.value, password.value));
              }
            }}
          >
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(Login);
