import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Spinner, Row, Col } from "react-bootstrap";
import {
  selectCurrentUser,
  selectStatus,
  selectMessage,
  resetMessage,
  updateUserAsync,
  createUserAsync,
} from "../reducer/usersSlice";
import CustomToast from "../../common/toast/CustomToast";
import styles from "./UserForm.module.css";

export const UserForm = () => {
  const [validated, setValidated] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const message = useSelector(selectMessage);
  const status = useSelector(selectStatus);
  const [showToast, setShowToast] = useState(false);

  const [lUser, setLUser] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    gender: "Male",
    status: true,
  });
  useEffect(() => {
    setLUser(Object.assign({}, currentUser));
  }, []);

  useEffect(() => {
    setShowToast(message ? true : false);
  }, [message]);

  const handleToastClose = (e) => {
    setShowToast(false);
    dispatch(resetMessage());
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
      if (lUser.id <= 0) {
        dispatch(createUserAsync(lUser));
      } else {
        dispatch(updateUserAsync(lUser));
      }
    }
  };
  const onChange = (e) => {
    let nlUser = Object.assign({}, lUser);
    nlUser[e.target.id] = e.target.value;
    setLUser(nlUser);
  };
  return (
    <div className={styles.formWrapper} xs={12}>
      <Row>
        <Col className={styles.backButtonWrapper} xs={12}>
          <Button
            variant="link"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            Back
          </Button>
        </Col>
      </Row>
      <Form
        className={styles.backButtonWrapper}
        onChange={onChange}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            value={lUser.first_name}
            disabled={status !== "idle"}
          />
          <Form.Control.Feedback type="invalid">
            Please enter first name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={lUser.last_name}
            disabled={status !== "idle"}
          />
          <Form.Control.Feedback type="invalid">
            Please enter last name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
              value={lUser.email}
              disabled={status !== "idle"}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            disabled={status !== "idle"}
            value={lUser.gender}
            size="sm"
          >
            <option>Male</option>
            <option>Female</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select gender.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Check
            disabled={status !== "idle"}
            defaultChecked={lUser.status}
            value={lUser.status}
            type="checkbox"
            label="Status"
          />
        </Form.Group>
        {status === "idle" && (
          <Button variant="primary" type="save">
            Save
          </Button>
        )}
        {status === "loading" && (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Saving...
          </Button>
        )}
      </Form>
      <CustomToast
        variant={status === "error" ? "Danger" : "Primary"}
        show={showToast}
        message={message}
        onClose={handleToastClose}
      />
    </div>
  );
};
