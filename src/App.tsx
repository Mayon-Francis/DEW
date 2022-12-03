import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import TabsBody from "./components/TabsBody";
import { useSmartAccountContext } from "./contexts/SmartAccountContext";
import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
import { LoginType } from "./index.d";
import { useLoginTypeContext } from "./contexts/LoginType";




const App: React.FC = () => {
  const classes = useStyles();
  const { connect, address, loading: eoaWalletLoading, signer } = useWeb3AuthContext();
  const { loading } = useSmartAccountContext();
  const { loginType, setLoginTypeFromUser } = useLoginTypeContext();
  if (!address) {

    return (
      <div
        className={classes.bgCover}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className={classes.title}>DEW</h1>
        <h3 className={classes.subTitle}>Decentralised NFT</h3>
        <div className={classes.cardWrapper}>
          <div className={classes.individualCardWrapper}>
            <div
              className={classes.card}
              onClick={() => {
                setLoginTypeFromUser(LoginType.CUSTOMER);
                connect();
              }}
            >
              <span className={classes.cardTitle}>I'm a Customer</span>
            </div>
            <div className={classes.cardBlob}></div>
          </div>
          <div className={classes.individualCardWrapper}>
            <div
              className={classes.card}
              onClick={() => {
                setLoginTypeFromUser(LoginType.RETAILER);
                connect();
              }}
            >
              <span className={classes.cardTitle}>I'm a Retailer</span>
            </div>
            <div
              className={classes.cardBlob}
              style={{
                background:
                  "radial-gradient(81.25% 81.25% at 67.32% 18.75%, #17B3A9 0%, #0945DF 100%)",
              }}
            ></div>
          </div>
          <div className={classes.individualCardWrapper}>
            <div
              className={classes.card}
              onClick={() => {
                setLoginTypeFromUser(LoginType.COMPANY);
                connect();
              }}
            >
              <span className={classes.cardTitle}>We're a Company</span>
            </div>
            <div
              className={classes.cardBlob}
              style={{
                background:
                  "radial-gradient(76.75% 76.75% at 70% 23.25%, #72047B 0%, #6709DF 100%)",
              }}
            ></div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className={classes.bgCover}>
      <Navbar />
      {loading ? (
        <div className={classes.container}>
          <img src="/logo.svg" className={classes.animateBlink} alt="" />
        </div>
      ) : (
        <TabsBody />
      )}
      <ToastContainer />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  bgCover: {
    backgroundColor: "#1a1e23",
    // backgroundImage: `url(/img/northern-lights-bg.png)`,
    backgroundSize: "cover",
    width: "100%",
    minHeight: "100vh",
    color: "#fff",
    fontStyle: "italic",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "80vh",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 0,
    fontSize: 60,
    background: "linear-gradient(90deg, #12ECB8 -2.21%, #00B4ED 92.02%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#fff",
  },
  cardWrapper: {
    display: "flex",
    padding: "2rem",
    gap: "5rem",
    marginBottom: 50,
    cursor: "pointer",
  },
  individualCardWrapper: {
    position: "relative",
  },
  card: {
    width: "250px",
    height: "350px",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.8s ease-in-out",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    "&:hover": {
      background: "linear-gradient(90deg, #0063FF -2.21%, #9100FF 89.35%)",
    },
    backdropFilter: "blur(21px)",
    borderRadius: "16px",
    position: "relative",
    isolation: "isolate",
  },
  cardBlob: {
    content: "''",
    width: "206.83px",
    height: "206.83px",
    background:
      "radial-gradient(76.75% 76.75% at 70% 23.25%, #E7CE4A 0%, #E64467 100%)",
    transform: "rotate(-0.42deg)",
    borderRadius: "50%",
    position: "absolute",
    bottom: "-100px",
    right: "100px",
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "24px",
    textAlign: "center",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  animateBlink: {
    animation: "$bottom_up 2s linear infinite",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  "@keyframes bottom_up": {
    "0%": {
      transform: "translateY(0px)",
    },
    "25%": {
      transform: "translateY(20px)",
    },
    "50%": {
      transform: "translateY(0px)",
    },
    "75%": {
      transform: "translateY(-20px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },
}));

export default App;
