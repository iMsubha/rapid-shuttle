import backgroundImage from "../../images/background.png";
import Navigation from "../Navigation/Navigation";
import VehicleCard from "../VehicleCard/VehicleCard";
import { Row } from "react-bootstrap";
import data from "../../Data/data.json";
import { useEffect, useState } from "react";
const Home = () => {
  const [vehicles, setVehicles] = useState(data);
  useEffect(() => {
    setVehicles(vehicles);
  }, []);
  const homeStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "100vh",
  };
  return (
    <div style={homeStyles}>
      <Navigation />
      <Row className="m-5 p-5 d-flex justify-justify-content-center align-items-center">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle}></VehicleCard>
        ))}
      </Row>
    </div>
  );
};

export default Home;
