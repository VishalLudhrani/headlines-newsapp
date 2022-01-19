import React from "react";
import { Button, Chip, Snackbar, Typography } from '@mui/material';

const Preferences = (props) => {

  const action = (
    <Button
      color="primary" 
      size="small"
      onClick={props.storeUserPref}
      >
      Save
    </Button>
  )

  return(
    <div style={{padding:  "2%"}}>
      <Typography variant="h4">
        Update your preferences
      </Typography>
      <br />
      <div>
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
      <Snackbar 
        open={true}
        message="Save changes?"
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  )
}

export default Preferences;