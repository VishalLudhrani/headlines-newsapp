import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Backdrop, CircularProgress } from '@mui/material';

const FeedItem = (props) => {

  return(
    <div>
      {props.currentNews == null ? (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h5">
          Fetching some news, please wait.
        </Typography>
      </Backdrop>
      ) : (
        <Card sx={{maxWidth: 768, margin: "16px auto"}}>
        <CardMedia
          component="img"
          alt="Image couldn't be loaded"
          height="256"
          image={props.currentNews.urlToImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.currentNews.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Category: {props.currentCategory}
          </Typography>
        </CardContent>
        {
          props.isLoggedIn && (
            <CardActions sx={{display: 'flex'}} >
              <Button size="large" sx={{flex: 'auto'}} onClick={props.getNews}>Next headline</Button>
            </CardActions>
          )
        }
      </Card>
      )}
    </div>
  )
}

export default FeedItem;