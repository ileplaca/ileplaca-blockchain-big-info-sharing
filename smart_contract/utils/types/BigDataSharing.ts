import { BigNumber } from "ethers"


export interface Data {
  owner_address: string,
  id: number,
  created_at: number,
  expiration_date: number,
  name: string,
}

export interface DataWithContent {
  data: Data,
  content: string
}

export interface DataWithPassword {
  data: Data,
  password: string
}

export interface BigDataSharing {
  addData: (
    expiration_date: number,
    name: string,
    content: string,
    password: string
  ) => Promise<void>,
  getOwnerDatas: () => Promise<DataWithPassword[]>,
  getDataById: (id: string | number, password: string) => Promise<DataWithContent>,

  deployed: () => Promise<void>
  connect: (address: any) => Promise<BigDataSharing>
  receive: ({ value }: { value: number | BigNumber }) => Promise<BigDataSharing>
}