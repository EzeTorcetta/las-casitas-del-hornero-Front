import React, { useEffect } from "react";
import { useSelector, dispatch } from "react-router-dom";
import axios from "axios";

const GetCurrencyExchange = ({ currencyAmount, currencySymbol }) => {
  let newCurrencyAmount = 0;
  const symbol = useSelector((state) => state.countrySymbol);
  const dispatch = useDispatch();

  const getCurrencyExchangeAPI = async () => {
    return await axios.get(
      `http://data.fixer.io/api/convert?access_key=103d465b515d3001d0386221b0bd6796&from=${symbol}&to=${currencySymbol}&amount=${currencyAmount}`
    );
  };

  useEffect(async () => {
    newCurrencyAmount = getCurrencyExchangeAPI();
  }, []);

  return newCurrencyAmount;
};

export default GetCurrencyExchange;
