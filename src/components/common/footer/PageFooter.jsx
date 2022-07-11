// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

// export const PageFooter = () => (
//   <footer className="page-footer font-small blue pt-4">
//     <Container fluid className="text-center text-md-left">
//       <Row>
//         <Col xs={12}>
//           <span>Web portal</span>
//         </Col>
//       </Row>
//     </Container>

//     <div className="footer-copyright text-center py-3">
//       © 2020 Copyright:
//       <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
//     </div>
//   </footer>
// );

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./PageFooter.module.css";

export const PageFooter = () => {
  return (
    <footer className={styles.footer}>
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col xs={12}>
            <span>Web portal</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
