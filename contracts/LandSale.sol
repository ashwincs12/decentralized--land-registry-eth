//SPDX-License-Identifier:MIT
pragma solidity ^0.8.24;

import "./Land.sol";

contract LandSale is LandRegistration
{
    struct BidDetail
    {
        uint highestBid;
        address highestBidder;
        address[] bidders;
        mapping(address=>uint) bids;
    }
    mapping(uint=>BidDetail) BidDetails;

    function Bid(uint LandID) public payable 
    {
        require(msg.sender!=ownerOf(LandID),"As the owner of this asset, you cannot place a bid!");
        require(BidDetails[LandID].bids[msg.sender]+msg.value>BidDetails[LandID].highestBid,"Bid Failed! Bidding amount must be higher than existing highest bid");
        BidDetails[LandID].highestBidder=msg.sender;
        BidDetails[LandID].bids[msg.sender]= BidDetails[LandID].bids[msg.sender]+msg.value;
        BidDetails[LandID].highestBid=BidDetails[LandID].bids[msg.sender];
        BidDetails[LandID].bidders.push(msg.sender);
        emit BidEvent(LandID, BidDetails[LandID].highestBidder, BidDetails[LandID].highestBid);
    }

    function acceptBid(uint LandID) public payable
    {
        payable(msg.sender).transfer(BidDetails[LandID].highestBid);
        safeTransferFrom(msg.sender,BidDetails[LandID].highestBidder,LandID);
        for(uint i=0;i<BidDetails[LandID].bidders.length;i++)
        {
            if(BidDetails[LandID].bidders[i]==BidDetails[LandID].highestBidder)
            {
                continue;
            }
            payable(BidDetails[LandID].bidders[i]).transfer(BidDetails[LandID].bids[BidDetails[LandID].bidders[i]]);
        }
        LandDetails[LandID].saleStatus=true;
    }


    fallback() external  {
            revert();
         }

    event BidEvent(uint256 indexed LandID, address highestBidder, uint256 highestBid);
}