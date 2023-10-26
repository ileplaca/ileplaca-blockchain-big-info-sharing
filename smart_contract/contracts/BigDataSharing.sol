// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Helpers.sol";
import "./BigDataSharingStructs.sol";

contract BigDataSharing {
    uint256 private data_id = 0;
    
    BigDataSharingStructs.Data[] private datas;

    mapping(uint256 => string) private datas_password;
    mapping(uint256 => string) private datas_content;

    function addData(uint256 _expiration_date, string memory _name, string memory _content, string memory _password) public {
        Helpers.validateStringLength(_name, 250);
        Helpers.validateStringLength(_content, 100000);
        Helpers.validateStringLength(_password, 100);

        datas.push(
            BigDataSharingStructs.Data(
                msg.sender,
                data_id,
                block.timestamp,
                _expiration_date,
                _name
            )
        );

        datas_password[data_id] = _password;
        datas_content[data_id] = _content;

        data_id++;
    }

    function getOwnerDatas() public view returns (BigDataSharingStructs.DataWithPassword[] memory) {
        BigDataSharingStructs.DataWithPassword[] memory owner_datas = new BigDataSharingStructs.DataWithPassword[](datas.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < datas.length; i++) {
            if (datas[i].owner_address == msg.sender) {
                owner_datas[counter] = BigDataSharingStructs.DataWithPassword(datas[i], datas_password[i]);
                counter++;
            }
        }

        assembly {
            mstore(owner_datas, counter)
        }

        return owner_datas;
    }



    function getDataById (uint256 _data_id, string memory _password) public view returns (BigDataSharingStructs.DataWithContent memory) {
        if (datas[_data_id].expiration_date <= block.timestamp && datas[_data_id].expiration_date != 0) {
            revert("Expiration date has passed.");
        }

        if ( datas[_data_id].owner_address == msg.sender) {
            return BigDataSharingStructs.DataWithContent(datas[_data_id], datas_content[_data_id]);
        }

        if (Helpers.compareStrings(datas_password[_data_id], _password)) {
            return BigDataSharingStructs.DataWithContent(datas[_data_id], datas_content[_data_id]);
        }

        revert("You pass wrong id/password");
    }
}