import React, { useEffect } from "react";

import getCrowdDAOContract from "../ethereum/dao";
import getGovernanceTokenContract from "../ethereum/token";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
    useEffect(() => {
        const loadContracts = async () => {
            const governanceTokenContract = await getGovernanceTokenContract();
            const crowdDAOContract = await getCrowdDAOContract();
        }

        loadContracts();
    }, []);

    return (
        <>        
            <Navbar />
            <h1>Witaj użytkowniku</h1>
        </>

    );
};

export default HomePage;