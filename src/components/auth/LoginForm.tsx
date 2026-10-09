import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import FormInput from "../common/forms/FormInput";
import FormButton from "../common/forms/FormButton";

import { users } from "../../data/users";
import { loginUser } from "../../utils/auth";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginForm = ({
  email,
  password,
}: LoginFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Fill the fields when Admin or User is selected.
  useEffect(() => {
    if (email || password) {
      setFormData({ email, password });
      setError("");
    }
  }, [email, password]);

  const handleChange = (
    field: keyof LoginFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    if (user.status !== "Active") {
      setError("Your account is inactive.");
      return;
    }

    loginUser(user);

    if (user.role === "Admin") {
      navigate("/admin/dashboard", {
        replace: true,
      });
    } else {
      navigate("/user/dashboard", {
        replace: true,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <FormInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(value) =>
          handleChange("email", value)
        }
      />

      <FormInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(value) =>
          handleChange("password", value)
        }
      />

      <FormButton
        type="submit"
        text="Login"
        variant="primary"
        size="lg"
        className="w-100"
      />
    </Form>
  );
};

export default LoginForm;