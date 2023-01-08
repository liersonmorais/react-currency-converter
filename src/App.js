import react, {useEffect, useState} from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';

const BASE_URL = 'http://api.coinlayer.com/live?access_key=39136802d8d2ec45ce27463d6d4b1d3f';

function App() {
  const [currencyOptions,setCurrencyOptions] = useState([])
  const [fromCurrency,setFromCurrency] = useState()
  const [toCurrency,setToCurrency] = useState()
  const [exchangeRate,setExchangeRate] = useState()
  const [amount,setAmount] = useState(1)
  const [amountInFromCurrency,setAmountInFromCurrency] = useState(true)

let toAmount,fromAmount
if(amountInFromCurrency){
  fromAmount = amount ;
  toAmount = amount * exchangeRate
} else {
  toAmount = amount ;
  fromAmount = amount / exchangeRate 
}

  useEffect(() => {
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {

          const moeda = Object.keys(data.rates)[58]
          setCurrencyOptions([data.target,...Object.keys(data.rates) ])
          setFromCurrency(data.target)
          setToCurrency(moeda)
          setExchangeRate(data.rates[moeda])
        })
  },[])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}&target=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency])) 
    }

  },[fromCurrency,toCurrency] ) 

  function handleFromAmountChange(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
}
  return (
    <>
        <h1>Exchange</h1>
        <div>Convert From <br /><CurrencyRow 
            currencyOptions={currencyOptions}
            selectCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          /> </div><br /><br />
          <div>Convert To <br />
          <CurrencyRow 
                currencyOptions={currencyOptions}
                selectCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
                /></div>
    </>

  );
}

export default App;
