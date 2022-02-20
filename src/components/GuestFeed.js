import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FeedItem from "./Feed/FeedItem";

const GuestFeed = () => {

  const [currentCategory, setCurrentCategory] = useState("general");
  const [news, setNews] = useState([]);
  const BASE_URL = "https://saurav.tech/NewsAPI/";

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    axios.get(`${BASE_URL}/top-headlines/category/${currentCategory}/in.json`).then((res) => {
      setNews(res.data.articles);
    }).catch((err) => {
      alert(`An error occurred while fetching some news: ${err.errorCode}\n${err.errorMessage}`);
    });
  }

  return (
    <>
      <Box
        container
        m={4}
      >
        <Box
         sx={{
           display: "flex",
           maxWidth: 768,
           margin: "0 auto"
          }}
          >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentCategory}
              label="Category"
              onChange={e => setCurrentCategory(e.target.value)}
            >
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="science">Science</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {
          news.length === 0
            ? (
              <h3>Kindly select a category.</h3>
            )
            : (
              news.map((currentNews, pos) => {
                return <FeedItem currentCategory={currentCategory} key={pos} currentNews={currentNews} getNews={getNews} isLoggedIn={false} />
              })
            )
        }
      </Box>
    </>
  )
}

export default GuestFeed;