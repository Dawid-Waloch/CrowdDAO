const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

export default buildModule("ContractsDeployment", (m) => {
    const token = m.contract("GovernanceToken");
    const dao = m.contract("CrowdDAO", [token]);

    return { token, dao };
});
