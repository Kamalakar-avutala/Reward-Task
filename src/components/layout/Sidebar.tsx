import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";

import {
  getLoggedInUser,
} from "../../utils/auth";

const Sidebar = () => {
  const user = getLoggedInUser();

  const isAdmin = user?.role === "Admin";

  return (
    <aside
      className="bg-dark text-white d-flex flex-column"
      style={{
        minWidth: "250px",
        minHeight: "100vh",
      }}
    >

      {/* Logo / Application Name */}
      <div className="p-3 border-bottom border-secondary">

        <h5 className="mb-1 text-white">
          Interview Royalty
        </h5>

        <small className="text-secondary">
          Reward Points System
        </small>

      </div>

      {/* User Role */}
      <div className="px-3 py-3 border-bottom border-secondary">

        <small className="text-secondary">
          Logged in as
        </small>

        <div className="mt-1">
          <Badge bg={isAdmin ? "danger" : "primary"}>
            {user?.role}
          </Badge>
        </div>

      </div>

      {/* Navigation */}
      <Nav
        className="flex-column p-3 gap-1"
      >

        {/* Dashboard */}
        <Nav.Item>
          <NavLink
            to={
              isAdmin
                ? "/admin/dashboard"
                : "/user/dashboard"
            }
            className={({ isActive }) =>
              `nav-link text-white rounded ${
                isActive
                  ? "bg-primary"
                  : ""
              }`
            }
          >
            Dashboard
          </NavLink>
        </Nav.Item>

        {/* Admin Navigation */}
        {isAdmin && (
          <>
            <Nav.Item>
              <NavLink
                to="/admin/reward-rules"
                className={({ isActive }) =>
                  `nav-link text-white rounded ${
                    isActive
                      ? "bg-primary"
                      : ""
                  }`
                }
              >
                Reward Rules
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/admin/rewards"
                className={({ isActive }) =>
                  `nav-link text-white rounded ${
                    isActive
                      ? "bg-primary"
                      : ""
                  }`
                }
              >
                Reward Catalogue
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/admin/audit-reports"
                className={({ isActive }) =>
                  `nav-link text-white rounded ${
                    isActive
                      ? "bg-primary"
                      : ""
                  }`
                }
              >
                Audit & Reports
              </NavLink>
            </Nav.Item>
          </>
        )}

        {/* User Navigation */}
        {!isAdmin && (
          <>
            <Nav.Item>
              <NavLink
                to="/user/transactions"
                className={({ isActive }) =>
                  `nav-link text-white rounded ${
                    isActive
                      ? "bg-primary"
                      : ""
                  }`
                }
              >
                Points Transactions
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/user/rewards"
                className={({ isActive }) =>
                  `nav-link text-white rounded ${
                    isActive
                      ? "bg-primary"
                      : ""
                  }`
                }
              >
                Rewards
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/user/redemptions"
                className={({ isActive }) =>
                  `nav-link text-white rounded ${
                    isActive
                      ? "bg-primary"
                      : ""
                  }`
                }
              >
                Redemption History
              </NavLink>
            </Nav.Item>
          </>
        )}

      </Nav>

      {/* Bottom User Information */}
      <div className="mt-auto p-3 border-top border-secondary">

        <div className="small text-secondary">
          {user?.employeeId}
        </div>

        <div className="small text-white">
          {user?.department}
        </div>

      </div>

    </aside>
  );
};

export default Sidebar;
