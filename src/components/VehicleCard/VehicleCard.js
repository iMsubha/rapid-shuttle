import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const VehicleCard = (props) => {
  const { vehicle_type, imageURL } = props.vehicle;
  console.log(props.vehicle);
  return (
    <Col className="mb-3">
      <Link
        className="text-decoration-none"
        to={`/destination/${vehicle_type}`}
      >
        <Card
          style={{ width: "170px", borderRadius: "10px" }}
          className="d-flex justify-content-center align-items-center p-3"
        >
          <Image
            src={imageURL}
            width={100}
            height={100}
            className="p-2"
          ></Image>
          {/* onClick={() => handleBook(vehicle_type)} */}
          <h5>{vehicle_type}</h5>
        </Card>
      </Link>
    </Col>
  );
};

export default VehicleCard;
