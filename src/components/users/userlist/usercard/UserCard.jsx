import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  EnvelopeFill,
  PersonFill,
  TriangleFill,
  ShieldFill,
} from "react-bootstrap-icons";
import styles from "./UserCard.module.css";

const UserCard = (props) => {
  const { user, onClick } = props;

  return (
    <div className={styles.userCardWrapper}>
      <Card onClick={onClick(user)}>
        <Card.Body>
          <Card.Title>
            <PersonFill /> {user.first_name} {user.last_name}
          </Card.Title>
          <Row>
            <Col md={4} xs={3}>
              <span>Email</span>
            </Col>
            <Col md={8} xs={8}>
              <Card.Text>{user.email}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={3}>
              <span>Gender</span>
            </Col>
            <Col md={8} xs={8}>
              <Card.Text>{user.gender}</Card.Text>
            </Col>
          </Row>

          <Row>
            <Col md={4} xs={3}>
              <span>Status</span>
            </Col>
            <Col md={8} xs={8}>
              <Card.Text>{user.status ? "Active" : "In-active"}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
export default UserCard;
