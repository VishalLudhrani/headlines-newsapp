import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import axios from 'axios';
import { Box } from '@mui/material';

const Feed = (props) => {

  const categoryKeys = Object.keys(props.categories);
  const categories = [];
  for(let instance of categoryKeys) {
    if(props.categories[instance]) {
      categories.push(instance);
    }
  }

  const [currentCategory, setCurrentCategory] = useState("general");
  const [currentNews, setCurrentNews] = useState(null);
  const BASE_URL = "https://saurav.tech/NewsAPI/";

  const randomizeCategory = (categories) =>{
    let size = categories.length;
    let randomIndex = Math.floor(Math.random() * size);
    setCurrentCategory(categories[randomIndex]);
  }

  const randomizeNews = (news) => {
    let size = news.length;
    let randomIndex = Math.floor(Math.random() * size);
    setCurrentNews(news[randomIndex]);
  }

  const getNews = () => {
    randomizeCategory(categories);
    axios.get(`${BASE_URL}/top-headlines/category/${currentCategory}/in.json`).then((res) => {
      randomizeNews(res.data.articles);
    }).catch((err) => {
      alert(`An error occurred while fetching some news: ${err.errorCode}\n${err.errorMessage}`);
    });
  }

  useEffect(() => {
    getNews();
  }, []);

  return(
    <Box 
      container
      m={4}
      >
      <FeedItem getNews={getNews} currentNews={currentNews} currentCategory={currentCategory} />
    </Box>
  )
}

export default Feed;