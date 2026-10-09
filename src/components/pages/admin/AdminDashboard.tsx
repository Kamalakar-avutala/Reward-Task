import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import {
  adminDashboardData,
} from "../../../data/dashboardData";

const AdminDashboard = () => {
  const { summary, topUsers, pendingRedemptions } =
    adminDashboardData;

  return (
    <Container fluid className="py-4">

      {/* Page Header */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">
          Admin Dashboard
        </h3>

        <p className="text-muted mb-0">
          Overview of interview reward points and redemptions
        </p>
      </div>

      {/* Summary Cards */}
      <Row className="g-3 mb-4">

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-2">
                Total Points Issued
              </p>

              <h3 className="fw-bold mb-0">
                {summary.totalPointsIssued.toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-2">
                Total Points Redeemed
              </p>

              <h3 className="fw-bold mb-0">
                {summary.totalPointsRedeemed.toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-2">
                Outstanding Points
              </p>

              <h3 className="fw-bold mb-0">
                {summary.outstandingPoints.toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-2">
                Pending Redemptions
              </p>

              <h3 className="fw-bold mb-0">
                {summary.pendingRedemptions}
              </h3>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Tables */}
      <Row className="g-4">

        {/* Top Users */}
        <Col xs={12} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-semibold">
                Top Users
              </h5>
            </Card.Header>

            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">

                <thead className="table-light">
                  <tr>
                    <th>User</th>
                    <th className="text-end">
                      Points Earned
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {topUsers.map((user) => (
                    <tr key={user.userId}>
                      <td>{user.name}</td>

                      <td className="text-end fw-semibold">
                        {user.totalEarned.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Pending Redemptions */}
        <Col xs={12} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-semibold">
                Pending Redemptions
              </h5>
            </Card.Header>

            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">

                <thead className="table-light">
                  <tr>
                    <th>User</th>
                    <th>Reward</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {pendingRedemptions.map((redemption) => (
                    <tr key={redemption.id}>
                      <td>{redemption.userName}</td>

                      <td>{redemption.rewardName}</td>

                      <td>
                        <Badge bg="warning" text="dark">
                          {redemption.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </Container>
  );
};

export default AdminDashboard;
