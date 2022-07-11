import React, { useEffect, useState } from "react";
import { UserList } from "../components/users/userlist/UserList";
import { Container, Row, Col } from "react-bootstrap";
import { Header } from "../components/common/header/Header";
import { PageFooter } from "../components/common/footer/PageFooter";
export const Home = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={12}>
            <UserList />
          </Col>
        </Row>
      </Container>
      <PageFooter />
    </>
  );
};
