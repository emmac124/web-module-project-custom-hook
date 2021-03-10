import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useDarkMode from './hooks/useDarkMode';
import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import axios from 'axios';

import "./styles.scss";

const App = () => {
  
  const [darkMode, setDarkMode] = useDarkMode();

  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
