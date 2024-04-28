import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './back.jpg'; // Import the background image file

const RegistrationForm = () => {
    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    // Get current year
    const currentYear = new Date().getFullYear();

    const [showRegistrationDetails, setShowRegistrationDetails] = useState(false);

    // State to hold form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        email: '',
        password: ''
    });

    // State to hold validation status for each field
    const [validation, setValidation] = useState({
        firstName: true,
        lastName: true,
        dobDay: true,
        dobMonth: true,
        dobYear: true,
        email: true,
        password: true
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        const isFormValid = Object.values(formData).every(value => value.trim() !== '');
        if (!isFormValid) {
            // Set validation status to false for unfilled fields
            const updatedValidation = {};
            for (const key in formData) {
                updatedValidation[key] = formData[key].trim() !== '';
            }
            setValidation(updatedValidation);
            return;
        }

        // Logic to handle form submission (e.g., API call, validation)
        // For now, just toggle the view to display registration details
        setShowRegistrationDetails(true);
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Reset validation status for the field being edited
        setValidation({
            ...validation,
            [name]: true
        });
    };

    // Destructure form data
    const { firstName, lastName, dobDay, dobMonth, dobYear, email, password } = formData;

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div style={{ width: '60vw', backgroundColor: 'white', borderRadius: '30px' }}>
                <Row>
                    {/* Background image */}
                    <Col md={6} className="background-col" style={{ backgroundImage: `url(${backgroundImage})`, borderRadius: '30px 0 0 30px', backgroundPosition: 'center' }}>
                        {/* You can adjust the background styles here */}
                    </Col>

                    {/* Registration form */}
                    <Col md={6} className="form-col" style={{ padding: '30px', display: showRegistrationDetails ? 'none' : 'block' }}>
                        <div className="form-container">
                            <h2>Register</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="firstName">First Name</Label>
                                            <Input type="text" name="firstName" id="firstName" placeholder="Enter your first name" value={firstName} onChange={handleInputChange} className={!validation.firstName ? 'is-invalid' : ''} />
                                            {!validation.firstName && <div className="invalid-feedback">Please enter your first name.</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="lastName">Last Name</Label>
                                            <Input type="text" name="lastName" id="lastName" placeholder="Enter your last name" value={lastName} onChange={handleInputChange} className={!validation.lastName ? 'is-invalid' : ''} />
                                            {!validation.lastName && <div className="invalid-feedback">Please enter your last name.</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="dob">Date of Birth</Label>
                                            <Row>
                                                <Col md={4}>
                                                    <Input type="select" name="dobDay" id="dobDay" value={dobDay} onChange={handleInputChange} className={!validation.dobDay ? 'is-invalid' : ''}>
                                                        <option>Select Day</option>
                                                        {range(1, 31).map(day => (
                                                            <option key={day}>{day}</option>
                                                        ))}
                                                    </Input>
                                                    {!validation.dobDay && <div className="invalid-feedback">Please select a day.</div>}
                                                </Col>
                                                <Col md={4}>
                                                    <Input type="select" name="dobMonth" id="dobMonth" value={dobMonth} onChange={handleInputChange} className={!validation.dobMonth ? 'is-invalid' : ''}>
                                                        <option>Select Month</option>
                                                        {Array.from({ length: 12 }, (_, i) => (
                                                            <option key={i}>{new Date(0, i).toLocaleString('en', { month: 'short' })}</option>
                                                        ))}
                                                    </Input>
                                                    {!validation.dobMonth && <div className="invalid-feedback">Please select a month.</div>}
                                                </Col>
                                                <Col md={4}>
                                                    <Input type="select" name="dobYear" id="dobYear" value={dobYear} onChange={handleInputChange} className={!validation.dobYear ? 'is-invalid' : ''}>
                                                        <option>Select Year</option>
                                                        {range(1980, currentYear).map(year => (
                                                            <option key={year}>{year}</option>
                                                        ))}
                                                    </Input>
                                                    {!validation.dobYear && <div className="invalid-feedback">Please select a year.</div>}
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="email" name="email" id="email" placeholder="Enter your email address" value={email} onChange={handleInputChange} className={!validation.email ? 'is-invalid' : ''} />
                                            {!validation.email && <div className="invalid-feedback">Please enter a valid email address.</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="password">Password</Label>
                                            <Input type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={handleInputChange} className={!validation.password ? 'is-invalid' : ''} />
                                            {!validation.password && <div className="invalid-feedback">Please enter a password.</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit">Register</Button>
                            </Form>
                        </div>
                    </Col>

                    {/* Registration details */}
                    {showRegistrationDetails && (
                        <Col md={6} style={{ padding: '30px' }}>
                            <div>
                                <h2>Registration Details</h2>
                                <p>First Name: {firstName}</p>
                                <p>Last Name: {lastName}</p>
                                <p>Date of Birth: {dobDay}/{dobMonth}/{dobYear}</p>
                                <p>Email: {email}</p>
                                <p>Password: {password}</p>
                            </div>
                        </Col>
                    )}

                </Row>
            </div>
        </Container>
    );
};

export default RegistrationForm;
