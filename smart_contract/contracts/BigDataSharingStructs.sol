// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library BigDataSharingStructs {
  struct Data {
    address owner_address;
    uint256 id;
    uint256 created_at;
    uint256 expiration_date;
    string name;
  }

  struct DataWithContent {
    Data data;
    string content;
  }

  struct DataWithPassword {
    Data data;
    string password;
  }
}