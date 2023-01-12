import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getProfile } from "../redux/action";
import styl from "../components/cssStyles/header.module.css";

const Header = ({ setIsLogIn, token, isLogIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adad, setAdad] = useState(0);
  const data = useSelector((state) => state.cart);
  const locUser = JSON.parse(localStorage.getItem("user")) ?? false;

  useEffect(() => {
    if (data.length) {
      const help = [];
      data.map((item) => {
        return help.push(item.qty);
      });
      const sum = help.reduce((first, num) => {
        return first + num;
      }, 0);
      return setAdad(sum);
    } else {
      setAdad(0);
    }
  }, [data]);

  return (
    <Navbar bg="info" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")}>
          <Button variant="info">
            <FontAwesomeIcon icon={faHome} />
            Mouse Market
          </Button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>

          <h5 onClick={() => navigate("/cart")}>
            <Button variant="info">
              <FontAwesomeIcon icon={faCartShopping} />
              <Badge bg="danger" className={styl.forBadge}>
                {adad ? adad : ""}
              </Badge>
            </Button>
          </h5>

          {isLogIn ? (
            <DropdownButton
              id="dropdown-item-button"
              title={locUser?.email}
              variant="info"
              className={styl.forDrop}
            >
              <Dropdown.Item
                as="button"
                onClick={() => {
                  navigate("/profile");
                  dispatch(getProfile(token));
                }}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => {
                  navigate("/orders");
                  dispatch(getAllOrders(token));
                }}
              >
                Orders
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => {
                  navigate("/setting/changePassword");
                }}
              >
                Setting
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => {
                  navigate("/");
                  localStorage.removeItem("user");
                  setIsLogIn(false);
                }}
              >
                Log Out
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <h5 className={styl.forDrop} onClick={() => navigate("/login")}>
              <Button variant="info">
                <FontAwesomeIcon icon={faUser} />
                Login
              </Button>
            </h5>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
