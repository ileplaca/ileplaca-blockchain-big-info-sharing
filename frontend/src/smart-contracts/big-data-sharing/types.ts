export type Data = [
  owner_address: string,
  id: number,
  created_at: number,
  expiration_date: number,
  name: string
];

export type DataWithPassword = [data: Data, password: string];
export type DataWithContent = [data: Data, content: string];

export interface BigDataSharing {
  addData: (
    expiration_date: number,
    name: string,
    content: string,
    password: string
  ) => Promise<void>;
  getOwnerDatas: () => Promise<DataWithPassword[]>;
  getDataById: (id: string | number, password: string) => Promise<DataWithContent>;
}
