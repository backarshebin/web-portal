import React from "react";
import { Navbar, Container } from "react-bootstrap";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <header>
      <Container fluid  className={styles.zeroPadding}>
        <Navbar bg="dark" expand="lg">
          <Container className={styles.zeroPadding}>
            <Navbar.Brand href="#home"></Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
    </header>
  );
};
