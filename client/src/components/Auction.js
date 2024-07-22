import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink, useParams } from "react-router-dom";
import { Table, Divider } from "antd";
import {ethers, formatUnits, parseUnits} from "ethers";

const columns = [
  {
    title: "Bidder",
    dataIndex: "bidder",
    key: "bidder",
  },
  {
    title: "Amount (in Wei)",
    dataIndex: "amount",
    key: "amount",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Auction({state}) {
  const {contract}=state;
  const {ethereum}=window;
  window.ethereum.on("accountsChanged",()=>
    {
      window.location.reload() 
    })

  const { landId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [landData, setLandData] = useState({
    surveyNo: "",
    district: "",
    taluk: "",
    village: "",
    blockNo: "",
    area: "",
    landValue: "",
    area : ""
  });
  const [landPrice, setLandPrice] = useState("");
  const [eventDetails, setEventDetails] = useState([]);
  const [currentAccount,setCurrentAccount]=useState("")

  useEffect(() => {
    getLandDetails();
    getEventDetails();
  }, [contract,currentAccount]);

  const getLandDetails = async () => {
    try {
      
      let landDetails = await contract.getLandDetails(landId)
      console.log(landDetails)
      let owner=await contract.ownerOf(landId)
      console.log(`Curr : ${currentAccount}, owner : ${owner}`)

      if(ethereum)
        {
          const account=await ethereum.request({method:"eth_requestAccounts"})
          setCurrentAccount(account[0])
        }

        if (owner.toUpperCase() === currentAccount.toUpperCase())
        {
          setIsOwner(true)
        }

      console.log(landPrice)

      let land = {
        surveyNo: landDetails[0],
        district: landDetails[1],
        taluk: landDetails[2],
        village: landDetails[3],
        blockNo: landDetails[4],
        area: landDetails[6],
        landValue: landDetails[5],
      };
      setLandData(land);
    } catch (error) {
      console.error("Error fetching land details:", error);
    }
  };

  const getEventDetails = async () => {
    try {
      const filter = contract.filters.BidEvent(landId);
      const events = await contract.queryFilter(filter);

      const eventDetails = events.map(event => ({
        key: event.transactionHash,
        bidder: event.args.highestBidder,
        amount: formatUnits(event.args.highestBid,"wei")
      }));

      setEventDetails(eventDetails);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const priceChangeHandler = (event) => {
    setLandPrice(event.target.value);
  };

  const bidSubmitHandler = async (event) => {
    // await contract.Bid(landId,)
    try
    {
      if(landPrice<landData.landValue)
      {
        throw new Error("Bid amount must  be greater than base price!")
      }
      const tx=await contract.Bid(landId,{value:landPrice})
      await tx.wait()
      alert("Bid successfully placed!")
      window.location.reload()
    }catch(error)
    {
      console.error("Error placing bid:", error);
      alert("Error placing bid: " + error.message);
    }
  };

  const acceptBidSubmitHandler = async (event) => {
    try{
    const tx=await contract.acceptBid(landId)
    await tx.wait()
    alert("Bid accepted successfully. NFT transfer successful!")
    window.location.reload()
    }catch(err)
    {
      alert("Currently no bids exist!")
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Back to Marketplace">
              <IconButton size="large" color="inherit" component={NavLink} to="/">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              LAND MARKETPLACE
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          paddingLeft: 15,
          paddingTop: 2,
          paddingBottom: 2,
          flexGrow: 1,
          maxWidth: "90%",
        }}
      >
        {landData && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img src={process.env.PUBLIC_URL + "/landSale.png"} alt="A" />
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Typography align="left">
                  <b>Land ID: </b>
                  {landId}
                </Typography>
              </Item>
              <br />
              <Item>
                <Typography align="left">
                  <b>Survey No: </b>
                  {Number(landData.surveyNo)}
                </Typography>
              </Item>
              <br />

              <Item>
                <Typography align="left">
                  <b>District: </b>
                  {landData.district}
                </Typography>
              </Item>
              <br />

              <Item>
                <Typography align="left">
                  <b>Taluk: </b>
                  {landData.taluk}
                </Typography>
              </Item>
              <br />

              <Item>
                <Typography align="left">
                  <b>Village: </b>
                  {landData.village}
                </Typography>
              </Item>
              <br />

              <Item>
                <Typography align="left">
                  <b>Block No: </b>
                  {Number(landData.blockNo)}
                </Typography>
              </Item>
              <br />

              <Item>
                <Typography align="left">
                  <b>Price: </b>
                  {Number(landData.landValue)}
                </Typography>
              </Item>
              <br />

              <Item>
                <Typography align="left">
                  <b>Total Area (in cent): </b>
                  {Number(landData.area)}
                </Typography>
              </Item>
              <br />
              
            </Grid>
            {isOwner ? (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={acceptBidSubmitHandler}
                  sx={{ height: 40 }}
                  color="primary"
                >
                  Accept Bid
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Bid Value"
                    helperText="Provide your bid value (should be greater than last bid)"
                    variant="outlined"
                    onChange={priceChangeHandler}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    sx={{ height: 55 }}
                    onClick={bidSubmitHandler}
                    variant="contained"
                    color="primary"
                  >
                    Place Bid
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        )}
        <Divider />
        <Table columns={columns} dataSource={eventDetails} />
      </Box>
    </div>
  );
}
