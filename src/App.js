// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [quantity, setQuantity] = useState(Number(""));
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function Loader() {
    return <p>isLoading...</p>;
  }

  useEffect(
    function () {
      async function fetchMoney() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${quantity}from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        setConverted(data.rates[toCurrency]);
        setIsLoading(false);
      }
      if (fromCurrency === toCurrency) return setConverted(quantity);
      fetchMoney();
    },
    [quantity, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="IDR">IDR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="IDR">IDR</option>
      </select>
      <p>{!isLoading ? `OUTPUT: ${converted} ${toCurrency}` : <Loader />}</p>
    </div>
  );
}
