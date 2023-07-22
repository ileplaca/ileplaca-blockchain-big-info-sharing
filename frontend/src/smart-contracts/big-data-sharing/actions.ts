import { ethereum } from 'smart-contracts';
import { bigDataSharingAbi, bigDataSharingAddress } from '.';
import { ethers } from 'ethers';
import { BigDataSharing } from './types';

export const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const bigDataSharingContract = new ethers.Contract(
    bigDataSharingAddress,
    bigDataSharingAbi,
    signer
  );

  return bigDataSharingContract as unknown as BigDataSharing;
};

class BigDataSharingClass {
  public async addData(
    expiration_date: number = 0,
    name: string,
    content: string,
    password: string = ''
  ) {
    const contract = await createEthereumContract();
    return await contract.addData(expiration_date, name, content, password);
  }

  public async getOwnerDatas() {
    const contract = await createEthereumContract();
    return await contract.getOwnerDatas();
  }

  public async getDataById(id: number | string, password: string) {
    const contract = await createEthereumContract();
    return await contract.getDataById(id, password);
  }
}

export const bigDataSharingActions = new BigDataSharingClass();
