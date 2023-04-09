import React, { useState } from "react";
import { Card, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login(props) {

    const [fields, setFields] = useState({ 
        login: "", 
        password: "",
        name:"",
        surname:"",
        phoneNumber:"",
        accountClosingDate:"", 
        numberRoad:"",
        road:"",
        zipCode:"",
        city:"",
        country:""
     });

    const handleform = e =>{
            e.preventDefault();
    }

    const handleImputs = e =>{
        
    }

    return (
        <>
            <h3 className="title_form">Vous êtes sur le point de vous inscritre</h3>
            <form onSubmit={handleform} className="container-form">
            <Row className="d-flex justify-content-center p-3 pt-5">
                <Card className="max-width-50-rem p-0">
                <Card.Header className="text-center">Inscription</Card.Header>
                    <Row className="pt-4 ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Identifiant (mail) </output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpLogin"><i className="fa fa-user"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text"
                                    aria-describedby="inpLogin"
                                    placeholder="Veuillez entrer votre email"
                                    value={fields.login}
                                    onChange={form => setFields({...fields, login: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Mot de passe</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpPassword"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="password" 
                                    aria-describedby="inpPassword"
                                    placeholder="Veuillez entrer un mot de passe (V1)"
                                    value={fields.password}
                                    onChange={form => setFields({...fields, password: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Nom</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpName"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpName"
                                    placeholder="Veuillez entrer votre nom"
                                    value={fields.name}
                                    onChange={form => setFields({...fields, name: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>   
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Prénom</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpSurname"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpSurname"
                                    placeholder="Veuillez entrer votre prénom"
                                    value={fields.surname}
                                    onChange={form => setFields({...fields, surname: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>   
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Numéro de téléphone</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpPhoneNumber"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpPhoneNumber"
                                    placeholder="Veuillez entrer votre numéro de téléphone / mobile"
                                    value={fields.phoneNumber}
                                    onChange={form => setFields({...fields, phoneNumber: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>  
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Numéro de voie</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpNumberRoad"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpNumberRoad"
                                    placeholder="Veuillez entrer le numéro de voie"
                                    value={fields.numberRoad}
                                    onChange={form => setFields({...fields, numberRoad: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row> 
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Nom de la voie</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpRoad"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpRoad"
                                    placeholder="Veuillez entrer le nom de la de voie"
                                    value={fields.road}
                                    onChange={form => setFields({...fields, road: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>  
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Département</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpZipCode"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpZipCode"
                                    placeholder="Veuillez le code postal"
                                    value={fields.inpZipCode}
                                    onChange={form => setFields({...fields, inpZipCode: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>  
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Ville</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpCity"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpCity"
                                    placeholder="Veuillez entrer la ville"
                                    value={fields.inpCity}
                                    onChange={form => setFields({...fields, inpCity: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>  
                    <Row className="ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                            <output>Pays</output>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inpCountry"><i className="fa fa-key"></i></InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inpCountry"
                                    placeholder="Veuillez Le pays"
                                    value={fields.inpCity}
                                    onChange={form => setFields({...fields, inpCity: form.target.value})}
                                />
                            </InputGroup>
                        </Col>
                    </Row>        
                    <Row className="pb-3 ps-3 pe-3">
                        <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
                            <Nav.Link
                                className="btn btn-dark w-100 text-white"
                                as={Link} to="/welcome" 
                                onClick={() => props.fetchOwner(
                                    fields.login, 
                                    fields.password,
                                    fields.name,
                                    fields.surname,
                                    fields.phoneNumber,
                                    fields.accountClosingDate,
                                    fields.numberRoad,
                                    fields.road,
                                    fields.zipCode,
                                    fields.city,
                                    fields.country
                                
                                    )}
                            >
                                Connexion
                            </Nav.Link>
                        </Col>
                        <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
                            <Nav.Link className="btn btn-dark w-100 text-white">
                                Mot de passe oublié
                            </Nav.Link>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row className="col-md-4 offset-md-4">
                <button>Envoyer</button>
            </Row>
            </form>
        </>
    );
}