import Spinner from "react-bootstrap/Spinner";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({
  message = "Loading...",
}: LoadingSpinnerProps) => {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" />
      <div className="mt-2 text-muted">
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner;