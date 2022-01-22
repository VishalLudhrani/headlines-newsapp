import * as React from 'react';
import { Button, Typography } from "@mui/material";
import { withStyles } from '@mui/styles';
import { Box } from '@mui/system';

const Hero = (props) => {

  const CustomColor = withStyles({
    root: {
      background: "-webkit-linear-gradient(45deg, #7D83FF 30%, #00E0B7 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  })(Typography);

  return(
    <Box container margin={2}>
      <Box margin={props.heroBoxMargin}>
        <CustomColor 
          variant={props.headingVariant}
          sx={{fontWeight: "800"}}
          >
          No articles, only headlines
        </CustomColor>
        <br />
        <Typography variant="h6">
          A simple news web app which helps busy professionals keep updated with news by reading just headlines. 
          <br />
          No articles, no temptation to read further, no time wasted.
        </Typography>
        <br />
        <Button
          variant="contained"
          size="large"
          sx={{height: "48px"}}
          onClick={props.signUpFunc}
        >
          Sign me up!
        </Button>
      </Box>
    </Box>
  );
}

export default Hero;