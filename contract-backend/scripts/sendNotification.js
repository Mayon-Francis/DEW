// const abi = import("../artifacts/contracts/warranty.sol/WarrantyNFT.json").abi;

async function main() {
  const [owner] = await ethers.getSigners();
  const contractAddress = "0x1C1817e6f03F543ff4Bd86C25a45e921800DEf7a";
  const MyContract = await ethers.getContractFactory("WarrantyNFT");
  const contract = await MyContract.attach(contractAddress);
  const tx = await contract.sendNotification({
    from: owner.address,
  });
  console.log(tx);
}

main();
