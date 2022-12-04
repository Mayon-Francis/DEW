// // Extra Dependencies
// import abi from "ethereumjs-abi";
// import {toBuffer} from "ethereumjs-util";
// import {ethers} from "ethers"
// import biconomy from "@biconomy/mexa"

// let walletProvider, walletSigner;

// const chainId = '0x5'

// const contractAbi:any =  [
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "_creator",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "_approved",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Approval",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "uri",
//                 "type": "string"
//             }
//         ],
//         "name": "ItemRepair",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "_replacedTokenId",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "_newTokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "ItemReplace",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "_from",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "_to",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Transfer",
//         "type": "event"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_approved",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "approve",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "creatorToIds",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "decay",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_creator",
//                 "type": "address"
//             }
//         ],
//         "name": "getCreatorIds",
//         "outputs": [
//             {
//                 "internalType": "uint256[]",
//                 "name": "",
//                 "type": "uint256[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_owner",
//                 "type": "address"
//             }
//         ],
//         "name": "getOwnerIds",
//         "outputs": [
//             {
//                 "internalType": "uint256[]",
//                 "name": "",
//                 "type": "uint256[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getTrustedForwarder",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "forwarder",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "idToApproved",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "idToWarranty",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "creator",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "currentOwner",
//                 "type": "address"
//             },
//             {
//                 "internalType": "string",
//                 "name": "itemSerialNumber",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "uri",
//                 "type": "string"
//             },
//             {
//                 "internalType": "bool",
//                 "name": "unlimitedTransfers",
//                 "type": "bool"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "numOfTransfersAvailable",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "period",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "timestamp",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_address",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "isApprovedAddress",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "forwarder",
//                 "type": "address"
//             }
//         ],
//         "name": "isTrustedForwarder",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "isValidWarranty",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "string",
//                 "name": "_uri",
//                 "type": "string"
//             }
//         ],
//         "name": "itemRepair",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_prevId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_newId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "itemReplace",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "_itemSerialNumber",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "_uri",
//                 "type": "string"
//             },
//             {
//                 "internalType": "bool",
//                 "name": "_unlimitedTransfers",
//                 "type": "bool"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_numOfTransfers",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_period",
//                 "type": "uint256"
//             }
//         ],
//         "name": "mint",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "string",
//                         "name": "itemSerialNumber",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "uri",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "bool",
//                         "name": "unlimitedTransfers",
//                         "type": "bool"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "numOfTransfers",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "period",
//                         "type": "uint256"
//                     }
//                 ],
//                 "internalType": "struct WarrantyNFT.mintInput[]",
//                 "name": "input",
//                 "type": "tuple[]"
//             }
//         ],
//         "name": "multipleMint",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "ownerToIds",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "sendNotification",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_period",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setPeriod",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setTimestamp",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_transfers",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setTransfersAvailable",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_to",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transferTo",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ]

// const address = "0x20eD1734DC849947710424e2118aBfb94F1D5535";



export {}

// export const sendTransaction=(userAddress:any,methodId:any, method:any, methodParams:any)=>{

// let contract = new ethers.Contract(address,
//               contractAbi, biconomy.getSignerByAddress(userAddress));
// let contractInterface = new ethers.utils.Interface(contractAbi);

// /*
//   This provider is linked to your wallet.
//   If needed, substitute your wallet solution in place of window.ethereum 
//  */
//  walletProvider = new ethers.providers.Web3Provider(window.ethereum);
//  walletSigner = walletProvider.getSigner();

//     const constructMetaTransactionMessage = (nonce, salt, functionSignature, contractAddress) => {
//         return abi.soliditySHA3(
//             ["uint256","address","uint256","bytes"],
//             [nonce, contractAddress, salt, toBuffer(functionSignature)]
//         );
//       }

// const sendTx = async (userAddress:any, functionData:any, r:any, s:any, v:any) => {
//         if (walletProvider && contract) {
//             try {
//                 fetch(`https://api.biconomy.io/api/v2/meta-tx/native`, {
//                     method: "POST",
//                     headers: {
//                       "x-api-key" : <BICONOMY_DASHBOARD_API_KEY>,
//                       'Content-Type': 'application/json;charset=utf-8'
//                     },
//                     body: JSON.stringify({
//                       "to":   address,//config.contract.address,
//                       "apiId": methodId,
//                       "params": [userAddress, functionData, r, s, v],
//                       "from": userAddress
//                     })
//                   })
//                   .then(response=>response.json())
//                   .then(async function(result) {
                   
//                   }).catch(function(error) {
//                       console.log(error)
//                     });
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     };


//     const getSignatureParameters = signature => {
//         if (!ethers.utils.isHexString(signature)) {
//             throw new Error(
//                 'Given value "'.concat(signature, '" is not a valid hex string.')
//             );
//         }
//         var r = signature.slice(0, 66);
//         var s = "0x".concat(signature.slice(66, 130));
//         var v = "0x".concat(signature.slice(130, 132));
//         v = ethers.BigNumber.from(v).toNumber();
//         if (![27, 28].includes(v)) v += 27;
//         return {
//             r: r,
//             s: s,
//             v: v
//         };
//     };     





// let nonce = await contract.getNonce(userAddress); //BigNumber
// let functionSignature = contractInterface.encodeFunctionData("setQuote", methodParams);
                             
// let messageToSign = constructMetaTransactionMessage(nonce.toNumber(), chainId, functionSignature, address);             
// const signature = await walletSigner.signMessage(messageToSign);
// let { r, s, v } = getSignatureParameters(signature);
// sendTx(userAddress, functionSignature, r, s, v);

// //////////
// /**helpers**/

        
    


// }
