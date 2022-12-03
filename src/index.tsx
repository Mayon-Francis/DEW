import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
// import { Web3Provider } from "./contexts/Web3Context";
import { Web3AuthProvider } from "./contexts/SocialLoginContext";
import { SmartAccountProvider } from "./contexts/SmartAccountContext";

import { LoginState } from "./contexts/LoginType";
const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    <LoginState>
      <Web3AuthProvider>
        {/* <Web3Provider> */}
        <SmartAccountProvider>
          <App />
        </SmartAccountProvider>
        {/* </Web3Provider> */}
      </Web3AuthProvider>
    </LoginState>
  );
};

root.render(<Index />);
