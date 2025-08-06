import { ethers } from "ethers";

const connectWallet = async () => {
    if(window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        const balance = provider.getBalance(walletAddress);

        return { provider, signer, balance };
    } else {
        alert("You have to install MetaMask!");
    }
}

const initContract = (contractAddress, contractAbi) => {
    const { signer } = connectWallet();
    if(!signer) return null;
    const contract = ethers.Contract(contractAddress, contractAbi.abi, signer);

    return contract;
};

export default initContract;