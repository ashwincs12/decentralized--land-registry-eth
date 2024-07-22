//SPDX-License-Identifier:MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LandRegistration is ERC721{

    //Defining NFT Metadata for token
    constructor() ERC721("Land","LND") {}

    struct LandDetail{
        uint surveyNo;
        string district;
        string taluk;
        string village;
        uint blockNo;
        uint landValue; //Per cent in Wei
        uint area;
        bool saleStatus;
        // bytes documentHash;
    }

    mapping(uint=>LandDetail) LandDetails; 

    uint public registeredLandCount=1;

    function registerNewLand(uint surveyNo,string memory district, string memory taluk, string memory village, uint blockNo,uint landValue,uint area) public 
    {
        LandDetails[registeredLandCount] = LandDetail(surveyNo,district,taluk,village,blockNo,landValue,area,false);
        _mint(msg.sender,registeredLandCount);
        registeredLandCount+=1;
    }

    function getLandDetails(uint landID) public view returns (LandDetail memory)
    {
        return LandDetails[landID];
    }

    function getRegisteredLandCount() public view returns(uint)
    {
        return registeredLandCount;
    }

}