import React, { createContext, useEffect, useState } from 'react';
import backgroundImage from '../../images/background.png'
import Navigation from '../Navigation/Navigation';
import vehiclesData from '../../Data/data.json'
import VehicleCard from '../VehicleCard/VehicleCard';
import { Col, Row } from 'react-bootstrap';

//export const VehiclesContext = createContext();

const Home = () => {
    const [vehicles, setVehicles] = useState(vehiclesData)
    useEffect(() => {
        setVehicles(vehicles);
        console.log(vehicles)
    }, [])

    const homeStyles = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        height: '100vh'
    }
    return (
        <div style={homeStyles}>
            <Navigation />
            {/* <VehiclesContext.Provider>

            </VehiclesContext.Provider> */}
            <Row className="m-5 p-5 d-flex justify-justify-content-center align-items-center">
                {
                    vehicles.map(vehicle => <VehicleCard vehicle={vehicle} ></VehicleCard>)
                }
            </Row>

            {/* <div>
                <Card>
                    <Image></Image>
                </Card>
            </div> */}
        </div>
    );
};

export default Home;