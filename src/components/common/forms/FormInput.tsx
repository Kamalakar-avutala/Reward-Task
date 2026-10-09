import Form from "react-bootstrap/Form";

interface FormInputProps {
  label: string;
  type?: string;
  name?: string;
  value: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required = false,
  disabled = false,
  error,
  onChange,
}: FormInputProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}

        {required && (
          <span className="text-danger"> *</span>
        )}
      </Form.Label>

      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
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

export default FormInput;