import { ethers } from "hardhat";
import { SMART_CONTRACTS } from "../utils/types/SmartContracts";

async function main() {
  const BigDataSharing = await ethers.getContractFactory(SMART_CONTRACTS.BIG_DATA_SHARING);
  const bigDataSharing = await BigDataSharing.deploy();

  await bigDataSharing.deployed();

  console.log(
    `BigDataSharing deployed to ${bigDataSharing.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
