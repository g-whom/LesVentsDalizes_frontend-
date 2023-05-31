import React from 'react';
import { Form } from 'react-bootstrap';

export default function PasswordInputField(props) {
  const { label, value, errorMessage, onChange, passwordCriteria } = props;

  return (
    <Form.Group controlId="password">
      <Form.Label>{label}</Form.Label>
      <div>
        {passwordCriteria.minLength && <span style={{ color: 'green' }}>8 caractères </span>}
        {passwordCriteria.lowercase && <span style={{ color: 'green' }}>1 minuscule </span>}
        {passwordCriteria.uppercase && <span style={{ color: 'green' }}>1 majuscule </span>}
        {passwordCriteria.number && <span style={{ color: 'green' }}>1 chiffre </span>}
        {passwordCriteria.specialChar && <span style={{ color: 'green' }}>1 caractère spécial </span>}
      </div>
      <Form.Control
        type="password"
        className={`form-input ${errorMessage ? 'invalid' : ''} ${!errorMessage && value !== '' ? 'valid' : ''}`}
        name="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isInvalid={!!errorMessage}
      />
      {errorMessage && <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>}
    </Form.Group>
  );
}
