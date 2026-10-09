import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import LoginForm from "../../auth/LoginForm";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleRoleSelect = (role) => {
    if (role === "Admin") {
      setCredentials({
        email: "admin@company.com",
        password: "admin123",
      });
    } else {
      setCredentials({
        email: "rahul@company.com",
        password: "123456",
      });
    }
  };

  return (
    <Container fluid className="min-vh-100 bg-light">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold">
                  Interview Royalty
                </h3>

                <p className="text-muted mb-0">
                  Reward Points System
                </p>
              </div>

              <LoginForm
                email={credentials.email}
                password={credentials.password}
              />

              <hr className="my-4" />

                <div className="mb-4">

                <div className="d-flex gap-3">
                  <Button
                    type="button"
                    variant="outline-primary"
                    className="w-50"
                    onClick={() => handleRoleSelect("Admin")}
                  >
                    Admin
                  </Button>

                  <Button
                    type="button"
                    variant="outline-success"
                    className="w-50"
                    onClick={() => handleRoleSelect("User")}
                  >
                    User
                  </Button>
                </div>
              </div>

              <div className="text-center text-muted">
                <small>
                  Interview Royalty & Reward Points System
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
