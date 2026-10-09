import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import {
  userDashboardData,
} from "../../../data/dashboardData";

const UserDashboard = () => {
  const {
    summary,
    recentTransactions,
    recentRedemptions,
  } = userDashboardData;

  return (
    <Container fluid className="py-4">

      {/* Page Header */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">
          My Dashboard
        </h3>

        <p className="text-muted mb-0">
          Overview of your interview reward points
        </p>
      </div>

      {/* Summary */}
      <Row className="g-3 mb-4">

        <Col xs={12} sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-2">
                Total Points Earned
              </p>

              <h3 className="fw-bold text-primary mb-0">
                {summary.totalEarned.toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-2">
                Points Redeemed
              </p>

              <h3 className="fw-bold text-danger mb-0">
                {summary.totalRedeemed.toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <p className="text-muted mb-2">
                Available Points
              </p>

              <h3 className="fw-bold text-success mb-0">
                {summary.availablePoints.toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Recent Data */}
      <Row className="g-4">

        {/* Transactions */}
        <Col xs={12} lg={7}>
          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-semibold">
                Recent Transactions
              </h5>
            </Card.Header>

            <Card.Body className="p-0">

              <Table responsive hover className="mb-0">

                <thead className="table-light">
                  <tr>
                    <th>Type</th>
                    <th>Reason</th>
                    <th>Points</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>

                      <td>
                        <Badge
                          bg={
                            transaction.type === "Earned"
                              ? "success"
                              : "danger"
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </td>

                      <td>{transaction.reason}</td>

                      <td className="fw-semibold">
                        {transaction.points > 0
                          ? `+${transaction.points}`
                          : transaction.points}
                      </td>

                      <td>{transaction.date}</td>

                    </tr>
                  ))}
                </tbody>

              </Table>

            </Card.Body>
          </Card>
        </Col>

        {/* Recent Redemptions */}
        <Col xs={12} lg={5}>
          <Card className="border-0 shadow-sm">

            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-semibold">
                Recent Redemptions
              </h5>
            </Card.Header>

            <Card.Body className="p-0">

              <Table responsive hover className="mb-0">

                <thead className="table-light">
                  <tr>
                    <th>Reward</th>
                    <th>Points</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentRedemptions.map((redemption) => (
                    <tr key={redemption.id}>

                      <td>
                        {redemption.rewardName}
                      </td>

                      <td>
                        {redemption.pointsUsed}
                      </td>

                      <td>
                        <Badge
                          bg={
                            redemption.status === "Completed"
                              ? "success"
                              : "warning"
                          }
                        >
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

export default UserDashboard;
