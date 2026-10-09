import type { ReactNode } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const PageHeader = ({
  title,
  description,
  action,
}: PageHeaderProps) => {
  return (
    <Row className="align-items-center mb-4">
      <Col>
        <h2 className="mb-1">{title}</h2>

        {description && (
          <p className="text-muted mb-0">
            {description}
          </p>
        )}
      </Col>

      {action && (
        <Col xs="auto">
          {action}
        </Col>
      )}
    </Row>
  );
};

export default PageHeader;