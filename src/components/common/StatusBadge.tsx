import Badge from "react-bootstrap/Badge";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getVariant = (): string => {
    switch (status.toLowerCase()) {
      case "active":
      case "enabled":
      case "available":
      case "completed":
      case "success":
        return "success";

      case "pending":
        return "warning";

      case "disabled":
      case "inactive":
      case "out of stock":
      case "cancelled":
      case "rejected":
      case "failed":
        return "danger";

      case "processing":
        return "info";

      default:
        return "secondary";
    }
  };

  return (
    <Badge bg={getVariant()}>
      {status}
    </Badge>
  );
};

export default StatusBadge;