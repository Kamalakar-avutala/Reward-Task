import { useNavigate } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

import {
  getLoggedInUser,
  logoutUser,
} from "../../utils/auth";

const Header = () => {
  const navigate = useNavigate();

  const user = getLoggedInUser();

  const handleLogout = () => {
    logoutUser();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Navbar bg="white" className="border-bottom">
      <Container fluid>

        <Navbar.Brand className="fw-bold">
          Interview Royalty
        </Navbar.Brand>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            className="border-0"
          >
            {user?.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>

            <Dropdown.Item disabled>
              <div className="fw-semibold">
                {user?.name}
              </div>

              <small className="text-muted">
                {user?.email}
              </small>

              <div className="mt-1">
                <Badge bg="primary">
                  {user?.role}
                </Badge>
              </div>
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item onClick={handleLogout}>
              Logout
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

      </Container>
    </Navbar>
  );
};

export default Header;
