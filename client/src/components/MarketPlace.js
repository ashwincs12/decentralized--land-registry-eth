import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

export default function MarketPlace(props) {

  const contract = props.contract;

  const navigate = useNavigate(); // Use useNavigate for React Router DOM v6

  const redirectHandle = (id) => {
    navigate(`/land/${id}`);
  };

  const [landDetails, setLandDetails] = React.useState([]);

  useEffect(() => {
    const getLandDetails = async () => {
      let landDetailsList = [];
  
      let landCount = Number(await contract.getRegisteredLandCount());
      console.log(Number(landCount))
      // let LandList=await contract.getLandDetails(2);
      // console.log(LandList)
      // let owner = await contract.ownerOf(2)
      // console.log(owner)

      for(let i=1;i<=(landCount-1);i++)
      {
          console.log("Value of i",i)
          let LandList=await contract.getLandDetails(i);
          let owner = await contract.ownerOf(i)
  
          let newLand={
            key: i,
            address: owner,
            area: Number(LandList[6]),
            price: Number(LandList[5]),
            status: LandList[7]
          }
  
          landDetailsList.push(newLand)
      }
  
      await setLandDetails(landDetailsList);
    };
    contract && getLandDetails()
    console.log(landDetails)
  }, [contract]);


  alert("This web application runs on Ethereum Holesky Network. Make sure you have an Metamask extension installed and set the network to Holesky Testnet to avaid unexpected errors.")
  
  return (
    <Box
      sx={{
        paddingLeft: 15,
        paddingTop: 2,
        paddingBottom: 2,
        flexGrow: 1,
        maxWidth: "90%",
      }}
    >
      <Grid container spacing={2}>
        {landDetails.map((land) => (
          <Grid item xs={4} key={land.key}>
            {land.status
              ? <Card
                id={land.key}
                sx={{ maxWidth: 440 }}
                value={land}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={process.env.PUBLIC_URL + "landSold.png"}
                  alt="land sold"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    ID: {land.key}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Owner:</b><br />
                    {land.address} <br />
                    <b>Area:</b> {land.area} Ares<br />
                    <b>Price:</b> N/A
                  </Typography>
                </CardContent>
                <CardActions>
                  <h4>SOLD!!</h4>
                </CardActions>
              </Card>
              : <Card
                id={land.key}
                sx={{ maxWidth: 440 }}
                value={land}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={process.env.PUBLIC_URL + "landSale.png"}
                  alt="land for sale"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    ID: {land.key}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Owner:</b><br />
                    {land.address} <br />
                    <b>Area:</b> {land.area} Ares<br />
                    <b>Price:</b> {land.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => redirectHandle(land.key)}>More Details</Button>
                </CardActions>
              </Card>
            }
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
