import * as React from 'react';
import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import { Box } from '@mui/system';
import theme from '../theme/theme';

const Hero = () => {
  return(
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} alignItems="center" padding="2em">
        <Grid item md={6} align="left">
          <Box container>
            <Typography variant="h3" align="left">
              A news app which helps busy professionals keep updated with just headlines.
            </Typography>
            <br />
            <Button 
              color="primary" 
              disableRipple
              variant="contained"
              size="large"
              sx={{borderRadius: "8px"}}
            >
              Sign me up!
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <img src="./hero-img.svg" width="100%" height="auto" />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Hero;