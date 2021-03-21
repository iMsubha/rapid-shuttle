import React from "react";
import { Card } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";

const Contact = () => {
  return (
    <div>
      <Navigation />
      <Card className="text-center">
        <h5>Our Office Address</h5>
        <h6>Phone: (+088)09245367</h6>
        <address>xyz,1212,road-03,Dhaka, Bangladesh</address>
      </Card>
    </div>
  );
};

export default Contact;
