import { Box, Button, Container, Typography } from "@mui/material";

export default function Landing() {
  return (
    <>

      <Container display="flex" maxWidth={"lg"} sx={{marginTop: "15rem"}}>
        <Box>
          <Typography variant="h2">
            Welcome to MeasureOne Quickstart App
          </Typography>
        </Box>

        <Typography variant="subtitle1" gutterBottom color={"#666666"}>
          The MeasureOne Consumer-permissioned-data flow begins with you creating a user, followed by a DataRequest and finally initiating the consumer flow. Start by clicking the link below to follow the steps and launch the client-side component that your users will interact for you to receive the requested information.
        </Typography>

        <p>
          <Button style={{ maxWidth: '200px', maxHeight: '30px', minWidth: '200px', minHeight: '60px', marginTop:"4em" }} variant='outlined' href={"/home"} >  LET's GO</Button>
        </p>

      </Container>
    </>
  );
}