import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import mapImage from "../../images/Map.png";
import { UserContext } from "../../App";
import { Link, useParams } from "react-router-dom";
import data from "../../Data/data.json";
import { SupervisorAccountOutlined } from "@material-ui/icons";
const Destination = (props) => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  const { vehicleType } = useParams();
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [vehicles, setVehicle] = useState(data);

  const [search, setSearch] = useState("false");
  useEffect(() => {
    setVehicle(vehicles);
    const selecteditem = vehicles.find((v) => v.vehicle_type === vehicleType);
    setSelectedVehicle(selecteditem);
    console.log(selecteditem);
  }, []);
  const handleClickSearch = () => {
    setSearch("true");
  };
  const handleBlur = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      {/* <h3>{vehicleType}</h3> */}

      <Container>
        <Row className="pt-4">
          <Col>
            <h5 className="font-weight-bold">Rapid Shuttle</h5>
          </Col>
          <Col className="d-flex justify-content-end mb-4">
            <Link className="mr-4 text-dark font-weight-normal" to="/home">
              Home
            </Link>
            <Link
              className="mr-4 text-dark font-weight-normal"
              to="/destination"
            >
              Destination
            </Link>
            <Link className="mr-4 text-dark font-weight-normal" to="/blog">
              Blog
            </Link>
            <Link className="mr-4 text-dark font-weight-normal" to="/contact">
              Contact
            </Link>
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
              style={
                search === "false"
                  ? {
                      width: "300px",
                      height: "230px",
                      borderRadius: "10px",
                      backgroundColor: "#F0F2F5",
                    }
                  : {
                      width: "300px",
                      height: "400px",
                      borderRadius: "10px",
                      backgroundColor: "#F0F2F5",
                    }
              }
              className="border p-4"
            >
              {search === "false" ? (
                <div>
                  <div className="mb-2">
                    <label htmlFor="pickFrom">Pick Form</label>
                    <br />
                    <input
                      onBlur={handleBlur}
                      style={{ width: "250px", border: "none", height: "35px" }}
                      type="text"
                      name="pickForm"
                      placeholder="Mirpur-1"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="pickTo">Pick To</label>
                    <br />
                    <input
                      style={{ width: "250px", border: "none", height: "35px" }}
                      type="text"
                      name="pickTo"
                      placeholder="Dhanmondi"
                    />
                  </div>
                  <Button
                    onClick={handleClickSearch}
                    style={{
                      backgroundColor: "#ff7b54",
                      border: "none",
                      width: "250px",
                    }}
                  >
                    Search
                  </Button>
                </div>
              ) : (
                <div>
                  <div
                    className="p-3 mb-2"
                    style={{ backgroundColor: "#ff7b54", borderRadius: "10px" }}
                  >
                    <h6 className="text-light">{selectedVehicle.pick_from}</h6>
                    <h6 className="text-light">{selectedVehicle.pick_to}</h6>
                  </div>
                  <div
                    className="bg-white p-3 mb-2 d-flex justify-content-around"
                    style={{ borderRadius: "10px" }}
                  >
                    <Image src={selectedVehicle.imageURL} width={50}></Image>
                    <h6 className="text-dark">{vehicleType}</h6>

                    <h6 className="font-weight-bold">
                      <SupervisorAccountOutlined />
                      {selectedVehicle.person_number}
                    </h6>
                    <h6 className="font-weight-bold">
                      ${selectedVehicle.amount}
                    </h6>
                  </div>
                  <div
                    className="bg-white p-3 mb-2 d-flex justify-content-around"
                    style={{ borderRadius: "10px" }}
                  >
                    <Image src={selectedVehicle.imageURL} width={50}></Image>
                    <h6 className="text-dark">{vehicleType}</h6>

                    <h6 className="font-weight-bold">
                      <SupervisorAccountOutlined />
                      {selectedVehicle.person_number}
                    </h6>
                    <h6 className="font-weight-bold">
                      ${selectedVehicle.amount * 2}
                    </h6>
                  </div>
                  <div
                    className="bg-white p-3 mb-2 d-flex justify-content-around"
                    style={{ borderRadius: "10px" }}
                  >
                    <Image src={selectedVehicle.imageURL} width={50}></Image>
                    <h6 className="text-dark">{vehicleType}</h6>

                    <h6 className="font-weight-bold">
                      <SupervisorAccountOutlined />
                      {selectedVehicle.person_number}
                    </h6>
                    <h6 className="font-weight-bold">
                      ${selectedVehicle.amount * 3}
                    </h6>
                  </div>
                </div>
              )}
              {/* <div className="mb-2">
                <label htmlFor="pickTo">Pick To</label>
                <br />
                <input
                  style={{ width: "250px", border: "none", height: "35px" }}
                  type="text"
                  name="pickTo"
                  placeholder="Dhanmondi"
                />
              </div> */}
              <div>
                {/* <div style={{ backgroundColor: "#ff7b54" }}>
                  <p>mirpur</p>
                  <p>dhanmondi</p>
                </div> */}
                {/* <Button
                  onClick={handleClickSearch}
                  style={{
                    backgroundColor: "#ff7b54",
                    border: "none",
                    width: "250px",
                  }}
                >
                  Search
                </Button> */}
              </div>
            </Form>
            {/* <Form
                style={{
                  backgroundColor: "#F0F2F5",
                  width: "300px",
                  height: "230px",
                }}
              >
                <div style={{ backgroundColor: "#ff7b54" }}>
                  <p>mirpur</p>
                  <p>dhanmondi</p>
                </div> 
              </Form> */}
          </Col>
          <Col xs={12} lg={8} className="d-flex justify-content-center">
            <Image style={{ height: "700px" }} src={mapImage}></Image>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Destination;
