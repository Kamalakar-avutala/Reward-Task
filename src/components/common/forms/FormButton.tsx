import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import type { ButtonHTMLAttributes } from "react";

interface FormButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: string;
  loading?: boolean;
}

const FormButton = ({
  text,
  variant = "primary",
  loading = false,
  disabled,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner
            size="sm"
            animation="border"
            className="me-2"
          />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default FormButton;