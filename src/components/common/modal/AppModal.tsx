import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import type { ReactNode } from "react";

interface AppModalProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  submitVariant?: string;
  size?: "sm" | "lg" | "xl";
  loading?: boolean;
}

const AppModal = ({
  show,
  title,
  children,
  onClose,
  onSubmit,
  submitText = "Save",
  submitVariant = "primary",
  size = "lg",
  loading = false,
}: AppModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size={size}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      {onSubmit && (
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant={submitVariant}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : submitText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AppModal;