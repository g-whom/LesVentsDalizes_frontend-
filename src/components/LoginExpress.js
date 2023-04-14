import React, { useState } from "react";
import { Card, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { Link }  from "react-router-dom";

export default function LoginExpress(props) {

    const [fields, setFields] = useState({ email: "", password: "" });

    return (
        <Row className="d-flex justify-content-center p-3 pt-5">
            <Card className="max-width-50-rem p-0">
            <Card.Header className="text-center">ok Authentification</Card.Header>
                <Row className="pt-4 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Identifiant : jeje@whum.com</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpEmail"><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text"
                                aria-describedby="inpEmail"
                                placeholder="Veuillez entrer un identifiant"
                                value={fields.email}
                                onChange={form => setFields({...fields, email: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Mot de passe+</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpPassword"><i className="fa fa-key"></i></InputGroup.Text>
                            <Form.Control 
                                type="password" 
                                aria-describedby="inpPassword"
                                placeholder="Veuillez entrer un mot de passe"
                                value={fields.password}
                                onChange={form => setFields({...fields, password: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="pb-3 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
                        <Nav.Link
                            className="btn btn-dark w-100 text-white"
                          
                            as={Link} to="/welcome" 
                            onClick={() => props.fetchOwner(fields.email, fields.password)}
                        >
                            Connexion
                        </Nav.Link>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
                        <Nav.Link className="btn btn-dark w-100 text-white">
                            [WAIT]Mot de passe oublié
                        </Nav.Link>
                    </Col>
                </Row>
            </Card>
        </Row>
    );
}