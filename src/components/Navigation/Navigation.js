import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
// import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Navigation = () => {

    return (
        <div>
            <Container>
                <Row className="pt-4">
                    <Col className="font-weight-bold">Rapid Shuttle</Col>
                    <Col className="d-flex justify-content-end mb-4">
                        <Link className="mr-4 text-dark font-weight-normal" to="/home">Home</Link>
                        <Link className="mr-4 text-dark font-weight-normal" to="/destination">Destination</Link>
                        <Link className="mr-4 text-dark font-weight-normal" to="/blog">Blog</Link>
                        <Link className="mr-4 text-dark font-weight-normal" to="/contact">Contact</Link>
                    </Col>
                    <Col xs={12} lg={4} className="d-flex justify-content-center">
                        <Link to="/login">
                            <Button style={{ backgroundColor: "#ff7b54", border: "none" }}>Log in</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Navigation;