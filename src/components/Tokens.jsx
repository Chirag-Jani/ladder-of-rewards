import React, { useState } from "react";

const Home = ({ contractAddress, account, contract }) => {
  // balance of the active account
  const [balance, setBalance] = useState(0);

  // registration
  const [regInfo, setRegInfo] = useState({
    rBy: "",
    rCode: "",
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h4 className="my-4 pt-5">Account: {account}</h4>
        <h4 className="my-4"> Tokens Available : {balance / 10 ** 18}</h4>
        <strong className="text-danger">
          Import your tokens to MetaMask using: {contractAddress}
        </strong>
        <button className="btn btn-primary my-4" onClick={checkBalance}>
          Get Updated Balance
        </button>

        <div className="container my-5 border border-dark p-5 d-flex flex-column w-50">
          <h3>Register:</h3>
          <input
            name="rBy"
            onChange={handleInput}
            className="my-2 p-2 text-center"
            type="text"
            placeholder="Reffered by"
          />
          <input
            name="rCode"
            onChange={handleInput}
            className="my-2 p-2 text-center"
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
