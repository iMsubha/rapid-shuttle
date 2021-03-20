import React, { useContext } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import mapImage from '../../images/Map.png'
import car from '../../images/Frame-2.png'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
// import logo from '../../images/Rapid Shuttle.png'
const Destination = () => {
    const [loginUser, setLoginUser] = useContext(UserContext)
    return (
        <div>
            {/* <iframe
                width="450"
                height="250"
                frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCh4b-fFffvY-QpYOcvASlgZrBUc6vhhz4&q=Eiffel+Tower,Paris+France" allowfullscreen>
            </iframe> */}
            <Container>
                <Row className="pt-4">
                    <Col >
                        {/* <Image src={logo}></Image> */}
                        <h5 className="font-weight-bold">Rapid Shuttle</h5>
                    </Col>
                    <Col className="d-flex justify-content-end mb-4">
                        <Link className="mr-4 text-dark font-weight-normal" to="/home">Home</Link>
                        <Link className="mr-4 text-dark font-weight-normal" to="/destination">Destination</Link>
                        <Link className="mr-4 text-dark font-weight-normal" to="/blog">Blog</Link>
                        <Link className="mr-4 text-dark font-weight-normal" to="/contact">Contact</Link>
                    </Col>
                    <Col>
                        <h6 className="font-weight-bold">{loginUser.name}</h6>
                    </Col>
                </Row>
            </Container>
            <div>
                <hr />
                <Row>
                    <Col xs={12} lg={4} className="d-flex justify-content-center mb-3">
                        <Form
                            style={{ width: "300px", height: "230px", borderRadius: "10px", backgroundColor: '#F0F2F5' }}
                            className="border p-4">
                            <div className="mb-2">
                                <label htmlFor="pickFrom">Pick Form</label><br />
                                <input style={{ width: '250px', border: "none", height: "35px" }} type="text" name="pickForm" placeholder="Mirpur-1" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="pickTo">Pick To</label><br />
                                <input style={{ width: '250px', border: "none", height: "35px" }} type="text" name="pickTo" placeholder="Dhanmondi" />
                            </div>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#ff7b54", border: "none", width: '250px' }}
                                >Search</Button>
                            </div>


                        </Form>
                        {/* <Form style={{ backgroundColor: '#F0F2F5', width: "300px", height: "230px" }}>
                            <div style={{ backgroundColor: "#ff7b54" }}>
                                <p>mirpur</p>
                                <p>dhanmondi</p>
                            </div>
                            <div className="bg-white">
                                <Image src={car} width={60}></Image>
                                <p>Car</p>
                                <SupervisorAccountIcon />
                            </div>
                        </Form> */}
                    </Col>
                    <Col xs={12} lg={8} className="d-flex justify-content-center">
                        <Image style={{ height: '700px' }} src={mapImage}></Image>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Destination;
