import React, { useState } from "react";

const Funds = ({ contractAddress, account, contract }) => {
  const [funds, setFunds] = useState(0);
  const [depositeInput, setDepositeInput] = useState("");
  const [withdrawInput, setWithdrawInput] = useState("");

  const handleDeposite = (e) => {
    e.preventDefault();
    if (e.target.value >= 0) {
      setDepositeInput(e.target.value);
    } else {
      setDepositeInput(0);
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (e.target.value >= 0) {
      setWithdrawInput(e.target.value);
    } else {
      setWithdrawInput(0);
    }
  };

  const deposite = async () => {
    alert(`deposite ${depositeInput}`);
  };

  const withdraw = async () => {
    alert(`deposite ${withdrawInput}`);
  };
  return (
    <div className="container m-5 p-5 d-flex flex-column">
      <h3 className="mx-5">Available funds: {funds}</h3>
      <button className="btn btn-primary w-25 my-4 mx-5">Refresh</button>
      <div className="d-flex">
        <div className="m-5 w-50 d-flex flex-column">
          <input
            type="number"
            placeholder="Deposite Funds"
            className="my-2 text-center p-2"
            onChange={handleDeposite}
            value={depositeInput}
          />
          <button className="btn btn-primary my-2" onClick={deposite}>
            Deposite
          </button>
        </div>
        <div className="m-5 w-50 d-flex flex-column">
          <input
            type="number"
            placeholder="Withdraw Funds"
            className="my-2 text-center p-2"
            onChange={handleWithdraw}
            value={withdrawInput}
          />
          <button className="btn btn-danger my-2" onClick={withdraw}>
            Deposite
          </button>
        </div>
      </div>
    </div>
  );
};

export default Funds;
