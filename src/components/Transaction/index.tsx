import { Biconomy } from "@biconomy/mexa";
import { ethers } from "ethers";
import { useEffect } from "react";
import { contractAbi } from "../../utils/abiOld";

// UI
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Container,
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import {  orange } from '@material-ui/core/colors';
// import { useState } from "react";

// ***********

const contractAddress = "0xA4627aE0B9cCF733b40bd661097dD4A8AD123DeA";
export type ExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
};

const biconomy = new Biconomy(window.ethereum as ExternalProvider, {
  apiKey: "B1ErYp2eE.f5ed0058-58b5-49c0-99bf-290af7e95864",
  debug: true,
  contractAddresses: [contractAddress],
});

console.log("biconomy", biconomy);

biconomy.on("txMined", (data: any) => {
  console.log("transaction data TXMINED", data);
});
biconomy.on("txHashGenerated", (data: any) => {
  console.log("transaction data TXHASH GENERATED", data);
});
biconomy.on("txHashChanged", (data: any) => {
  console.log("transaction data", data);
});
biconomy.on("error", (data: any) => {
  console.log("transaction data ERROR", data);
});

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
  overrides: {
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "white",
        },
        color: "white", // if you also want to change the color of the input, this is the prop you'd use
      },
    },
  },
});

const useStyles = makeStyles({
  textField: {
//     color: "#fff",
//     borderColor: "#fff",
//     "&::placeholder": {
//       color: "#fff",
//     },
  },
});


async function initialise() {
  console.log("initialising");
  await biconomy.init();
  console.log("biconomy initialised");
  const provider = await biconomy.provider;

  const contract = new ethers.Contract(
    contractAddress,
    contractAbi,
    biconomy.ethersProvider
  );
  console.log("contract", contract);

  const { data } = await contract.populateTransaction.mint(
    "serialNumber",
    "uri",
    true,
    10,
    1000000
  );

  const userAddress = await biconomy.signer?.getAddress();
  console.log("userAddress", userAddress);
  let txParams = {
    data: data,
    to: contractAddress,
    from: userAddress,
    signatureType: "PERSONAL_SIGN",
  };
  if (provider.send) {
    console.log("SENDING TX");
    provider.send(
      {
        method: "eth_sendTransaction",
        params: [txParams],
      },
      (err: any, res: any) => {
        console.log("err", err);
        console.log("res", res);
      }
    );
  }
}


function Transaction(props: any) {
  const classes = useStyles();

  useEffect(() => {
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          width: "60vw",
          marginTop: "200px",
          background:
            "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom data-aos="fade-left">
              Brand
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              data-aos="fade-right"
              id="outlined-basic"
              label="Samsung, Apple..."
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom data-aos="fade-left">
              Model Number
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              data-aos="fade-right"
              id="outlined-basic"
              label="AB12-38xxxxx"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom data-aos="fade-left">
              Is your product still under warranty?
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl data-aos="fade-right">
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup defaultValue={"false"} name="isUnderWarranty" row>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom data-aos="fade-left">
              Is your product in working condition?
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl data-aos="fade-right">
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup defaultValue={"false"} name="isWorking" row>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom data-aos="fade-left">
              Describe physical condition
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField data-aos="fade-right" multiline fullWidth />
          </Grid>

          <Grid item xs={11}>
            <Button variant="contained" onClick={initialise}>MINT</Button>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <TextField data-aos="fade-right" multiline fullWidth />
        </Grid>
        {/* <Grid item xs={8}>
     <input type="file" onChange={(e)=>{setPhoto(e.target.files[0])}}/>
    </Grid> */}
      </Container>
    </ThemeProvider>
  );
}

export default Transaction;
