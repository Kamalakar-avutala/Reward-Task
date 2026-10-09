import Form from "react-bootstrap/Form";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

const FormSelect = ({
  label,
  value,
  options,
  required = false,
  disabled = false,
  error,
  onChange,
}: FormSelectProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}

        {required && (
          <span className="text-danger"> *</span>
        )}
      </Form.Label>

      <Form.Select
        value={value}
        disabled={disabled}
        isInvalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Form.Select>

      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormSelect;