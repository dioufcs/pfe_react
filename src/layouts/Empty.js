import {Col, Container, Row} from "shards-react";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainFooter from "../components/layout/MainFooter";
import PropTypes from "prop-types";
import React from "react";

const LoginLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col>
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}

      </Col>
    </Row>
  </Container>
);

LoginLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

LoginLayout.defaultProps = {
  noNavbar: true,
  noFooter: true
};


export default LoginLayout;
