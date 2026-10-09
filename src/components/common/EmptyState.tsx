import Card from "react-bootstrap/Card";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({
  message = "No data available.",
}: EmptyStateProps) => {
  return (
    <Card className="border-0 text-center py-5">
      <Card.Body>
        <div className="fs-1 mb-2">📭</div>

        <p className="text-muted mb-0">
          {message}
        </p>
      </Card.Body>
    </Card>
  );
};

export default EmptyState;