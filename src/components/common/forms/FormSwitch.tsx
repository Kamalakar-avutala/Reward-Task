import Form from "react-bootstrap/Form";

interface FormSwitchProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

const FormSwitch = ({
  label,
  checked,
  disabled = false,
  onChange,
}: FormSwitchProps) => {
  return (
    <Form.Check
      type="switch"
      label={label}
      checked={checked}
      disabled={disabled}
      onChange={(e) =>
        onChange(e.target.checked)
      }
    />
  );
};

export default FormSwitch;