import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function UserForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    mail: '',
    passe: '',
    adresse: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(formData);
    console.log(jsonData); // affiche les données sous forme de JSON dans la console
    fetch('http://example.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data)) // affiche la réponse du serveur dans la console
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Formulaire utilisateur</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="passe"
                value={formData.passe}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Envoyer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserForm;
