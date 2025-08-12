import React from "react";

import getCrowdDAOContract from "../ethereum/dao";
import getGovernanceTokenContract from "../ethereum/token";
import Navbar from "../components/Navbar/Navbar";
import { PageWrapper } from "../components/PageWrapper";
import { Button } from "../components/ButtonStyled";
import { PageStyled } from "../components/PageStyled";
import { useRouter } from "next/router";

const HomePage = () => {
    const router = useRouter();
    const loadContracts = async () => {
        const governanceTokenContract = await getGovernanceTokenContract();
        const crowdDAOContract = await getCrowdDAOContract();

        router.push('/proposals');
    };

    return (
        <PageStyled>        
            <Navbar />
            <PageWrapper>
                <h1>👋 Welcome to CrowdDAO!</h1>
                <p>Join the community and take part in decentralized organization voting.</p>
                <Button onClick={loadContracts}>🔗 Connect Wallet</Button>
            </PageWrapper>
        </PageStyled>

    );
}

export default HomePage;