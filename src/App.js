import { useEffect, useState } from "react";
import Ladder from "./artifacts/contracts/LOR.sol/Ladder.json";
import { ethers } from "ethers";
import Tokens from "./components/Tokens";
import Funds from "./components/Funds";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  // current active account
  const [account, setAccount] = useState("");

  // contract to call methods
  const [contract, setContract] = useState();

  // to set the values
  useEffect(() => {
    // getting metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // loading metamask info
    const loadProvider = async () => {
      try {
        // getting signer
        const signer = provider.getSigner();

        // getting contract
        const contract = new ethers.Contract(
          contractAddress,
          Ladder.abi,
          signer
        );

        // setting contract
        setContract(contract);

        // getting account address
        const address = await signer.getAddress();
        // setting account address
        setAccount(address);
      } catch (error) {
        console.error(error.message);
      }

      // if chain changed
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      // if account changed
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    };

    // calling methods
    provider && loadProvider();
  }, [contractAddress]);
  return (
    <div className="App">
      <Tokens
        contractAddress={contractAddress}
        account={account}
        contract={contract}
      />
      <Funds
        contractAddress={contractAddress}
        account={account}
        contract={contract}
      />
    </div>
  );
}

export default App;
