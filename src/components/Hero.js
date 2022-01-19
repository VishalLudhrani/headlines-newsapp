import * as React from 'react';
import { Button, Grid, Typography } from "@mui/material";
import { Box } from '@mui/system';

const Hero = (props) => {
  return(
    <Grid container spacing={2} alignItems="center" padding="2em">
      <Grid item md={6} align="left">
        <Box container>
          <Typography variant="h4" align="left">
            A news app which keeps busy professionals updated with just headlines.
          </Typography>
          <br />
          <Button 
            color="primary" 
            disableRipple
            variant="contained"
            size="large"
            onClick={props.signUpFunc}
          >
            Sign me up!
          </Button>
        </Box>
      </Grid>
      <Grid item md={6}>
        <img src="./hero-img.svg" width="100%" height="auto" alt="A woman reading newspaper at a park." />
      </Grid>
    </Grid>
  );
}

export default Hero;