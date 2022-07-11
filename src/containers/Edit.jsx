import React from "react";

import { UserForm } from "../components/users/user/UserForm";
import { Container, Row, Col } from "react-bootstrap";
import { Header } from "../components/common/header/Header";
import { PageFooter } from "../components/common/footer/PageFooter";

export const Edit = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={12}>
            <UserForm />
          </Col>
        </Row>
      </Container>
      <PageFooter />
    </>
  );
};
