import React, {
  ReactElement,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import "./index.scss";
import { Block } from "./components/Block";
import { Currencies } from "./components/Currencies";
import { CURRENCIES } from "./constants/currencies";
import { API_URL_EXCHANGE_RATES } from "./constants/urls";
import { ExchangeRate } from "./types/types";

function App(): ReactElement {
  const exchangeRatesRef = useRef<ExchangeRate[]>(null);

  const [fromCurrency, setFromCurrency] = useState<string>(CURRENCIES.USD);
  const [toCurrency, setToCurrency] = useState<string>(CURRENCIES.UAH);

  const [fromPrice, setFromPrice] = useState<number>(0);
  const [toPrice, setToPrice] = useState<number>(0);

  useEffect(() => {
    try {
      axios.get(API_URL_EXCHANGE_RATES).then(({ data }) => {
        exchangeRatesRef.current = data;
        onChangeFromPrice(1);
      });
    } catch (e) {
      console.warn(e);
      alert("Не вдалося отримати інформацію!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrencyRate = useCallback(
    (currency: string) =>
      exchangeRatesRef.current?.find(({ cc }) => cc === currency)?.rate || 1,
    [exchangeRatesRef]
  );

  const onChangeFromPrice = useCallback(
    (value: number) => {
      if (String(fromPrice)) {
        if (fromCurrency === CURRENCIES.UAH) {
          const result = value / getCurrencyRate(toCurrency);

          setToPrice(result);
        } else {
          const price = value * getCurrencyRate(fromCurrency);
          const result = price / getCurrencyRate(toCurrency);

          setToPrice(result);
        }

        setFromPrice(value);
      }
    },
    [fromPrice, fromCurrency, getCurrencyRate, toCurrency]
  );

  const onChangeToPrice = useCallback(
    (value: number) => {
      if (String(toPrice)) {
        if (toCurrency === CURRENCIES.UAH) {
          const result = value / getCurrencyRate(fromCurrency);

          setFromPrice(result);
        } else {
          const price = value * getCurrencyRate(toCurrency);
          const result = price / getCurrencyRate(fromCurrency);

          setFromPrice(result);
        }

        setToPrice(value);
      }
    },
    [toPrice, fromCurrency, toCurrency, getCurrencyRate]
  );

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, fromPrice, onChangeFromPrice]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, toPrice, onChangeToPrice]);

  return (
    <div className="App">
      <Block value={fromPrice} onChangeValue={onChangeFromPrice}>
        <Currencies currency={fromCurrency} setCurrency={setFromCurrency} />
      </Block>
      <Block value={toPrice} onChangeValue={onChangeToPrice}>
        <Currencies currency={toCurrency} setCurrency={setToCurrency} />
      </Block>
    </div>
  );
}

export default App;
