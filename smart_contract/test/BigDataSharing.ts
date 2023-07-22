import { assert, expect } from 'chai';
import hre, { ethers } from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import { SMART_CONTRACTS } from '../utils/types/SmartContracts';
import { BigDataSharing } from '../utils/types/BigDataSharing';

describe(SMART_CONTRACTS.BIG_DATA_SHARING, () => {
  let bigDataSharing: BigDataSharing;
  let deployer: any;

  beforeEach(async () => {
    deployer = (await hre.getNamedAccounts()).deployer;
    const passingSecretInfoContract = await ethers.getContractFactory(SMART_CONTRACTS.BIG_DATA_SHARING);
    bigDataSharing = await passingSecretInfoContract.deploy() as unknown as BigDataSharing;
    await bigDataSharing.deployed()
  })

  describe("get datas by owner adderss", () => {
    it ('get datas as owner', async () => {
      await bigDataSharing.addData(
        0,
        "Test name of data",
        "Test content of data",
        "",
      )

      const datas = await bigDataSharing.getOwnerDatas();

      assert.equal(datas.length, 1)
    })

    it ('try to get datas as not owner', async () => {
      await bigDataSharing.addData(
        0,
        "Test name of data",
        "Test content of data",
        "",
      )

      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];
      const secondAccountContract = await bigDataSharing.connect(secondAccount);
      const secondAccountDatas = await secondAccountContract.getOwnerDatas();

      assert.equal(secondAccountDatas.length, 0);
    })
  })

  describe("get data by id", () => {
    it ("get data as owner", async () => {
      await bigDataSharing.addData(
        0,
        "Test name of data",
        "Test content of data",
        "",
      )

      const data = await bigDataSharing.getDataById(0, "");

      assert.equal(data.data.id, 0);
    })

    it ("get data after expiration time", async () => {
      await bigDataSharing.addData(
        10,
        "Test name of data",
        "Test content of data",
        "",
      )

      expect(bigDataSharing.getDataById(0, "")).to.be.revertedWith("Expiration date has passed.")
    })

    it ("get data with correct password", async () => {
      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      await bigDataSharing.addData(
        0,
        "Test name of data",
        "Test content of data",
        "password",
      )

      const secondAccountContract = await bigDataSharing.connect(secondAccount);
      const data = await secondAccountContract.getDataById(0, "password");

      assert.equal(data.data.id, 0);
    })

    it ("get data with wrong password", async () => {
      const accounts = await ethers.getSigners();
      const secondAccount = accounts[1];

      await bigDataSharing.addData(
        0,
        "Test name of data",
        "Test content of data",
        "password1",
      )

      const secondAccountContract = await bigDataSharing.connect(secondAccount);

     expect(secondAccountContract.getDataById(0, "password")).to.be.revertedWith("You pass wrong password")
    })
  })
})