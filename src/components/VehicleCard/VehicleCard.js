import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const VehicleCard = (props) => {
  const { vehicle_type, imageURL } = props.vehicle;
  //console.log(props.vehicle);
  return (
    <Col className="mb-3">
      <Link
        className="text-decoration-none"
        to={`/destination/${vehicle_type}`}
      >
        <Card
          style={{ width: "170px", borderRadius: "10px" }}
          className="d-flex justify-content-around align-items-center px-4 py-4 shadow"
        >
          <Image
            src={imageURL}
            width={100}
            height={100}
            className="p-2 mb-2"
          ></Image>
          <small className="text-dark font-weight-bolder">
            {vehicle_type.toUpperCase()}
          </small>
        </Card>
      </Link>
    </Col>
  );
};

export default VehicleCard;
