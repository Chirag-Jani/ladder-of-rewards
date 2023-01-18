import Home from "./components/Home";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  return (
    <div className="App">
      <Home contractAddress={contractAddress} />
    </div>
  );
}

export default App;
