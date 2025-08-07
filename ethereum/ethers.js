import { ethers } from "ethers";

const connectWallet = async () => {
    if(window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        const balance = await provider.getBalance(walletAddress);

        return { provider, signer, balance };
    } else {
        alert("You have to install MetaMask!");
    }
}

const initContract = async (contractAddress, contractAbi) => {
    const wallet = await connectWallet();
    if(!wallet || !wallet.signer) return null;
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, wallet.signer);

    return contract;
};

export default initContract;