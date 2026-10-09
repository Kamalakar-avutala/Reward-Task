import Form from "react-bootstrap/Form";

interface FormTextareaProps {
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

const FormTextarea = ({
  label,
  value,
  placeholder,
  rows = 3,
  required = false,
  error,
  onChange,
}: FormTextareaProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}

        {required && (
          <span className="text-danger"> *</span>
        )}
      </Form.Label>

      <Form.Control
        as="textarea"
        rows={rows}
        value={value}
        placeholder={placeholder}
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

export default FormTextarea;