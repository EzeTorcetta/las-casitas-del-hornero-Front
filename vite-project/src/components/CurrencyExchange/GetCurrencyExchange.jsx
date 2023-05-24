import { useSelector } from "react-redux";

const GetCurrencyExchange = ({ value }) => {
  const state = useSelector((state) => state.currencyExchange);
  let rate = state.rate || state.base;
  return (value * rate) / state.base;
};

export default GetCurrencyExchange;
