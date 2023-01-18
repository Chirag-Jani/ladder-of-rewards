import React, { useState, useEffect } from "react";
import Ladder from "../artifacts/contracts/LOR.sol/Ladder.json";
import { ethers } from "ethers";

const Home = ({ contractAddress }) => {
  // current active account
  const [account, setAccount] = useState("");

  // balance of the active account
  const [balance, setBalance] = useState(0);

  // contract to call methods
  const [contract, setContract] = useState();

  // registration
  const [regInfo, setRegInfo] = useState({
    rBy: "",
    rCode: "",
  });

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
  });

  // to get the balance
  const checkBalance = async () => {
    try {
      let bal = await contract.getBalance(account);
      setBalance(parseInt(bal._hex));
    } catch (error) {
      console.log(error);
    }
  };

  // getting user input
  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setRegInfo({ ...regInfo, [name]: value });
  };

  // to register the user
  const register = async () => {
    try {
      // calling function
      let reg = await contract.register(regInfo.rBy, regInfo.rCode);

      // waiting to get executed
      await reg.wait();

      // logging tx info
      console.log(reg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h4 className="my-4 pt-5">Account: {account}</h4>

        <h4> Tokens Available : {balance}</h4>
        <button className="btn btn-primary my-2" onClick={checkBalance}>
          Get Updated Balance
        </button>
        <div className="container my-5 border border-dark p-5 d-flex flex-column w-50">
          <h3>Register:</h3>
          <input
            name="rBy"
            onChange={handleInput}
            className="my-2"
            type="text"
            placeholder="Reffered by"
          />
          <input
            name="rCode"
            onChange={handleInput}
            className="my-2"
            type="text"
            placeholder="Enter your unique code "
          />
          <button className="btn btn-primary" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
