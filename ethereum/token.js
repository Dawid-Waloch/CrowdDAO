import deployedAddress from "./ignition/deployments/chain-11155111/deployed_addresses.json";
import governanceTokenAbi from "./ignition/deployments/chain-11155111/artifacts/ContractsDeployment#GovernanceToken.json"
import initContract from "./ethers";

const governanceTokenContract = initContract(deployedAddress["ContractsDeployment#GovernanceToken"], governanceTokenAbi.abi);

export default governanceTokenContract;
