import deployedAddress from "./ignition/deployments/chain-11155111/deployed_addresses.json";
import crowdDAOAbi from "./ignition/deployments/chain-11155111/artifacts/ContractsDeployment#CrowdDAO.json"
import initContract from "./ethers";

const crowdDAOContract = await initContract(deployedAddress["ContractsDeployment#CrowdDAO"], crowdDAOAbi.abi);

export default crowdDAOContract;