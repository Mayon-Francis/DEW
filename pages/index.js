
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import WalletConnect from "@walletconnect/web3-provider";

 const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: "5ead597854fc415d97a3626c3fa39fb3",
    },
  },
};

let web3Modal
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
}

const Home = () => {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [smartAccount, setSmartAccount] = useState(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);

  const sAddress = smartAccount?.address;
  console.log("address", sAddress);

  const connectWeb3 = async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    // const signer = web3Provider.getSigner();
    setProvider(web3Provider);
    const accounts = await web3Provider.listAccounts();
    setAccount(accounts[0]);
  };

  const disconnectWeb3 = async () => {
    web3Modal.clearCachedProvider();
    setProvider(undefined);
    setAccount(undefined);
    setScwAddress("");
  };

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress("");
      setScwLoading(true);
      const smartAccount = new SmartAccount(provider, {
        activeNetworkId: ChainId.GOERLI,
        supportedNetworksIds: [ChainId.GOERLI],
      });
      await smartAccount.init();
      const context = smartAccount.getSmartAccountContext();
      setScwAddress(context.baseWallet.getAddress());
      setSmartAccount(smartAccount);
      setScwLoading(false);
    }
    if (!!provider && !!account) {

      setupSmartAccount();
      console.log("Provider...", provider, account);
    }
  }, [account, provider]);

  return (
    <div >
      {/* <div className={styles.container}></div> */}
      <main>
      {/* <main className={styles.main}> */}
        <h1>Biconomy SDK Next.js Web3Modal Example</h1>
        <button onClick={!account ? connectWeb3 : disconnectWeb3}>
          {!account ? "Connect Wallet" : "Disconnect Wallet"}
        </button>

        {account && (
          <div>
            <h2>EOA Address</h2>
            <p>{account}</p>
          </div>
        )}

        {scwLoading && <h2>Loading Smart Account...</h2>}

        {scwAddress && (
          <div>
            <h2>Smart Account Address</h2>
            <p>{scwAddress}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
