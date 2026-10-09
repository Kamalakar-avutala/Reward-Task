import Card from "react-bootstrap/Card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon?: string;
  description?: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
  description,
}: SummaryCardProps) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="text-muted small mb-2">
              {title}
            </div>

            <h3 className="mb-1">
              {value}
            </h3>

            {description && (
              <small className="text-muted">
                {description}
              </small>
            )}
          </div>

          {icon && (
            <div className="fs-3">
              {icon}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;