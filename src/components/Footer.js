import React from "react";
import { Container, Navbar } from "react-bootstrap";
import styl from "../components/cssStyles/footer.module.css";
const Footer = () => {
  return (
    <div>
      <Navbar bg="info" expand="lg" className={styl.footer}>
        <Container fluid></Container>
      </Navbar>
    </div>
  );
};

export default Footer;
