import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import {
  validateCustomer,
  validatePassword,
  validateAddress,
  validatePasswordMinLength,
  validatePasswordLowercase,
  validatePasswordUppercase,
  validatePasswordNumber,
  validatePasswordSpecialCharacter
} from '../utils/ValidationUtils';
import InputField from './InputField';
import PasswordInputField from './PasswordInputField';
import '../../css/form.css';

export default function CreateCustomerView2(props) {
  const [customer, setCustomer] = useState({
    name: '',
    surname: '',
    birthdate: null,
    subscriptionDate: null,
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    accountClosingDate: null,
    address: {
      numberRoad: '',
      road: '',
      zipCode: '',
      city: '',
      country: ''
    }
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    birthdate: '',
    subscriptionDate: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    accountClosingDate: '',
    numberRoad: '',
    road: '',
    zipCode: '',
    city: '',
    country: ''
  });

  const validationErrors = validateCustomer(
    customer.name,
    customer.surname,
    customer.birthdate,
    customer.subscriptionDate,
    customer.username,
    customer.phoneNumber,
    customer.accountClosingDate
  );

  const [isValid, setIsValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false
  });

  const [isNameValid, setIsNameValid] = useState(false);

  const handlePasswordChange = (value) => {
    handleChange('password', value);

    const criteria = {
      minLength: validatePasswordMinLength(value, 8).length === 0,
      lowercase: validatePasswordLowercase(value).length === 0,
      uppercase: validatePasswordUppercase(value).length === 0,
      number: validatePasswordNumber(value).length === 0,
      specialChar: validatePasswordSpecialCharacter(value).length === 0
    };

    setPasswordCriteria(criteria);
  };

  const handleChange = (field, value) => {
    let errorMessage = '';

    switch (field) {
      case 'name':
        errorMessage = validateCustomer(field, value);
        setIsNameValid(errorMessage.length === 0);
        break;
      case 'surname':
      case 'birthdate':
      case 'subscriptionDate':
      case 'username':
      case 'phoneNumber':
      case 'accountClosingDate':
        errorMessage = validateCustomer(field, value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      case 'confirmPassword':
        errorMessage = validatePassword(value, customer.password);
        break;
      default:
        break;
    }

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [field]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage
    }));
  };

  const handleAddressChange = (field, value) => {
    const updatedAddress = {
      ...customer.address,
      [field]: value
    };

    const addressErrors = validateAddress(updatedAddress);

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: updatedAddress
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      address: addressErrors
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createCustomer(customer);

      if (response.isSuccess) {
        setModalContent('Customer created successfully.');
        setShowModal(true);
        setCustomer({
          name: '',
          surname: '',
          birthdate: null,
          subscriptionDate: null,
          username: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          accountClosingDate: null,
          address: {
            numberRoad: '',
            road: '',
            zipCode: '',
            city: '',
            country: ''
          }
        });
      } else {
        setModalContent('Failed to create customer.');
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      setModalContent('An error occurred while creating the customer.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  useEffect(() => {
    const isFormValid = Object.values(errors).every((error) => error === '');

    setIsValid(isFormValid);
  }, [errors]);

  return (
    <Container>
      <h1>Create Customer</h1>
      <Form>
        <InputField
          label="Name"
          value={customer.name}
          error={errors.name}
          onChange={(value) => handleChange('name', value)}
          className={isNameValid ? 'valid-input' : ''}
        />
        <InputField
          label="Surname"
          value={customer.surname}
          error={errors.surname}
          onChange={(value) => handleChange('surname', value)}
        />
        <InputField
          label="Birthdate"
          value={customer.birthdate}
          type="date"
          error={errors.birthdate}
          onChange={(value) => handleChange('birthdate', value)}
        />
        <InputField
          label="Subscription Date"
          value={customer.subscriptionDate}
          type="date"
          error={errors.subscriptionDate}
          onChange={(value) => handleChange('subscriptionDate', value)}
        />
        <InputField
          label="Username"
          value={customer.username}
          error={errors.username}
          onChange={(value) => handleChange('username', value)}
        />
        <PasswordInputField
          label="Password"
          value={customer.password}
          error={errors.password}
          onChange={(value) => handlePasswordChange(value)}
          passwordCriteria={passwordCriteria}
        />
        <InputField
          label="Confirm Password"
          value={customer.confirmPassword}
          type="password"
          error={errors.confirmPassword}
          onChange={(value) => handleChange('confirmPassword', value)}
        />
        <InputField
          label="Phone Number"
          value={customer.phoneNumber}
          error={errors.phoneNumber}
          onChange={(value) => handleChange('phoneNumber', value)}
        />
        <InputField
          label="Account Closing Date"
          value={customer.accountClosingDate}
          type="date"
          error={errors.accountClosingDate}
          onChange={(value) => handleChange('accountClosingDate', value)}
        />
        <InputField
          label="Number/Road"
          value={customer.address.numberRoad}
          error={errors.address.numberRoad}
          onChange={(value) => handleAddressChange('numberRoad', value)}
        />
        <InputField
          label="Road"
          value={customer.address.road}
          error={errors.address.road}
          onChange={(value) => handleAddressChange('road', value)}
        />
        <InputField
          label="Zip Code"
          value={customer.address.zipCode}
          error={errors.address.zipCode}
          onChange={(value) => handleAddressChange('zipCode', value)}
        />
        <InputField
          label="City"
          value={customer.address.city}
          error={errors.address.city}
          onChange={(value) => handleAddressChange('city', value)}
        />
        <InputField
          label="Country"
          value={customer.address.country}
          error={errors.address.country}
          onChange={(value) => handleAddressChange('country', value)}
        />
        <Button variant="primary" onClick={handleSubmit} disabled={!isValid}>
          Create Customer
        </Button>
      </Form>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
