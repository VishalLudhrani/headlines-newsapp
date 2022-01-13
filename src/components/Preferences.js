import React from "react";
import { Chip, Typography } from '@mui/material';

const Preferences = (props) => {
  return(
    <div style={{padding:  "2%"}}>
      <Typography variant="h4">
        Update your preferences
      </Typography>
      <br />
      {props.categories.map((category, pos) => {
        return(
          <Chip
            key={pos}
            label={category}
            variant={props.userPref[category] ? "filled" : "outlined"}
            color="primary"
            sx={{
              margin: 1
            }}
            onClick={() => props.handleChipClick(category)} />
        )
      })}
    </div>
  )
}

export default Preferences;