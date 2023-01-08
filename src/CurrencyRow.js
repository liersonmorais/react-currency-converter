import React from 'react'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <span>
      <select value={selectCurrency} onChange={onChangeCurrency}>
            {
              currencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>  
              ))
            }
            

        </select>&nbsp;&nbsp;<br />Amount<br />
      <input type="number" className='input' value={amount} onChange={onChangeAmount} />
    </span>
  )
}
