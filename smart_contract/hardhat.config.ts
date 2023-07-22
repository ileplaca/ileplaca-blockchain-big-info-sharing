import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-waffle'
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

export default config;
