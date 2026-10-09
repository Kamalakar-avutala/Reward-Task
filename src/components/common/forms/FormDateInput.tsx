import Form from "react-bootstrap/Form";

interface FormDateInputProps {
  label: string;
  value: string;
  required?: boolean;
  min?: string;
  max?: string;
  error?: string;
  onChange: (value: string) => void;
}

const FormDateInput = ({
  label,
  value,
  required = false,
  min,
  max,
  error,
  onChange,
}: FormDateInputProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}

        {required && (
          <span className="text-danger"> *</span>
        )}
      </Form.Label>

      <Form.Control
        type="date"
        value={value}
        min={min}
        max={max}
        isInvalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormDateInput;