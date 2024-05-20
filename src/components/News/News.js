import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = process.env.REACT_APP_NYT_API_KEY;
      const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`);
      setNews(response.data.results.slice(0, 5)); // Top 5 news stories
    };

    fetchNews();
  }, []);

  return (
    <div className="news">
      {news.map((article, index) => (
        <div key={index} className="news-article">
          <h3>{article.title}</h3>
          <p>{article.byline}</p>
          <p>{article.abstract}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      ))}
    </div>
  );
};

export default News;