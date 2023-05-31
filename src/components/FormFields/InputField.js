import React from "react";
import { Form, Alert } from "react-bootstrap";

const InputField = ({ label, name, type, value, onChange, onBlur, error, isValid, infoText }) => {
  const inputClass = isValid ? "form-control is-valid" : "form-control is-invalid";

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        className={inputClass}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur && onBlur()} // Appel facultatif de onBlur s'il est défini
        isInvalid={!!error}
      />
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      {infoText && <Form.Text className="text-muted">{infoText}</Form.Text>}
    </Form.Group>
  );
};

export default InputField;
