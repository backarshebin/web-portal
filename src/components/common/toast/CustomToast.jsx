import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";

const CustomToast = (props) => {
  const { message, variant, show, onClose } = props;

  return (
    <ToastContainer position="top-end">
      <Toast
        autohide
        delay={2000}
        bg={variant.toLowerCase()}
        onClose={onClose}
        show={show}
      >
        <Toast.Header>
          <small>{variant === "Danger" ? "Error" : "Success"}</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default CustomToast;
