import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { SiWeb3Dotjs } from "react-icons/si";
import abi from "./abi/abi.json";
import data from "./data/data.json";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [nfts, setNfts] = useState(data);

  const balance = async () => {
    const contract = new ethers.Contract(
      "0xa27D1cEDF3AeCB7c88358caAaF4A27301e1F1a43",
      abi,
      provider
    );
    const tempBalance = await contract.balanceOf(
      "0x8D8dB741CC92ea91F4ca70E3cF83148CCC682C34"
    );
  };

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      setAccount(accounts[0]);
    } else console.log("Please install metamask");
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <div className="page">
      <div className="header">
        <img
          src={require("./assets/images/ethereum.png")}
          className="ethIcon"
        />
        <p>
          Berke.Web3
          <span>
            <SiWeb3Dotjs style={{ marginLeft: "5px" }} />
          </span>
        </p>
        {account == "" ? (
          <button onClick={initConnection} className="button">
            Connect
          </button>
        ) : (
          <p>...{account.substring(account.length - 7)}</p>
        )}
      </div>
      <div className="main">
        {nfts.lists.map((nft, index) => {
          return (
            <div key={index}>
              <p>{nft.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
