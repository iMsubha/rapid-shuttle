import backgroundImage from "../../images/background.png";
import Navigation from "../Navigation/Navigation";
import VehicleCard from "../VehicleCard/VehicleCard";
import { Row } from "react-bootstrap";
import data from "../../Data/data.json";
import { useEffect, useState } from "react";
const Home = () => {
  // const vehicles = [
  //   {
  //     id: 1,
  //     vehicle_type: "BIKE",
  //     pick_from: "",
  //     pick_to: "",
  //     person_number: "",
  //     amount: "60",
  //     date: "6/12/2020",
  //     imageURL: "https://i.ibb.co/VxpHCd8/Frame.png",
  //     time: "10:15 PM",
  //   },
  //   {
  //     id: 2,
  //     vehicle_type: "BUS",
  //     pick_from: "",
  //     pick_to: "",
  //     person_number: "",
  //     amount: "",
  //     date: "23/3/2021",
  //     imageURL: "https://i.ibb.co/Zf5BzT7/Frame-1.png",
  //     time: "12:02 PM",
  //   },
  //   {
  //     id: 3,
  //     vehicle_type: "CAR",
  //     pick_from: "",
  //     pick_to: "",
  //     person_number: "",
  //     amount: "",
  //     date: "22/9/2020",
  //     imageURL: "https://i.ibb.co/ySFy2ng/Frame-2.png",
  //     time: "5:30 AM",
  //   },
  //   {
  //     id: 4,
  //     vehicle_type: "TRAIN",
  //     pick_from: "",
  //     pick_to: "",
  //     person_number: "",
  //     amount: "",
  //     date: "10/12/2020",
  //     imageURL: "https://i.ibb.co/Np74Rw6/Group.png",
  //     time: "3:11 PM",
  //   },
  // ];
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
