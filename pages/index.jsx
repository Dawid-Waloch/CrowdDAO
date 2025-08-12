import React from "react";

import getCrowdDAOContract from "../ethereum/dao";
import getGovernanceTokenContract from "../ethereum/token";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
    const loadContracts = async () => {
        const governanceTokenContract = await getGovernanceTokenContract();
        const crowdDAOContract = await getCrowdDAOContract();
    };

    return (
        <>        
            <Navbar />
            <h1>Witaj użytkowniku</h1>
            <button onClick={loadContracts}>Connect with the wallet</button>
        </>

    );
}

export default HomePage;