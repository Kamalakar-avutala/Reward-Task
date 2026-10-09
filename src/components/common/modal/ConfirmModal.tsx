import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  show,
  title,
  message,
  confirmText = "Confirm",
  confirmVariant = "primary",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onCancel}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">
          {message}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Please wait..." : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;