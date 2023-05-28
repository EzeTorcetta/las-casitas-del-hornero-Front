import { useSelector } from "react-redux";

const GetCurrencyExchange = ({ value }) => {
  const { rate, symbol } = useSelector(
    (state) => state.currencyExchange
  );
  const rateSymbol = rate[symbol] || rate.ARS;
  const currency = ((value * rateSymbol) / rate.ARS).toFixed(2);
  return `$ ${currency.toLocaleString("es-AR")}`;
};

export default GetCurrencyExchange;
