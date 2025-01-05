import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { data } from '../../db'

import './fancy.css'

const CurrencySwapForm = () => {
  const [currencyOptions, setCurrencyOptions] = useState()
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()

  const [amountToSend, setAmountToSend] = useState('')
  const [amountToReceive, setAmountToReceive] = useState()

  const [error, setError] = useState()

  useEffect(() => {
    const formattedData = data.map((item, index) => {
      return { label: item.currency, key: index }
    })
    setCurrencyOptions(formattedData)
  }, [])

  const handleFromCurrencySelect = e => {
    const selectedCurrency = currencyOptions.filter(item => item.key == e.key)
    setFromCurrency(selectedCurrency[0].label)
  }

  const handleToCurrencySelect = e => {
    const selectedCurrency = currencyOptions.filter(item => item.key == e.key)
    setToCurrency(selectedCurrency[0].label)
  }

  const handleAmountToSendChange = e => {
    setAmountToSend(e.target.value)
  }

  const handleSwapButtonClick = () => {
    if (!fromCurrency || !toCurrency) {
      alert('Please select both currencies before swapping!')
      return
    }
    if (amountToSend <= 0 || !amountToSend) {
      alert('Please enter a valid amount to send before swapping!')
      return
    }

    const fromCurrencyValue = data.filter(item => item.currency == fromCurrency)
    const toCurrencyValue = data.filter(item => item.currency == toCurrency)

    // Convert to USD using fromCurrency value
    let amountInUSD = amountToSend * fromCurrencyValue[0].price
    // Convert USD to target currency
    let convertedAmount = amountInUSD / toCurrencyValue[0].price

    setAmountToReceive(convertedAmount)
  }

  return (
    <form className="w-2/5 h-3/4 max-h-2/3 flex flex-col justify-evenly items-center bg-white rounded-xl relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="text-4xl">Currency Trade Request Form</div>
      <div className="w-3/4 flex justify-between">
        <div>
          <span>From: </span>
          <Dropdown
            menu={{
              onClick: handleFromCurrencySelect,
              items: currencyOptions,
            }}
            trigger={['click']}
            className="border-2 border-stone-600 rounded-lg p-1"
          >
            <Space>
              {fromCurrency ? fromCurrency : 'Select currency'}
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
        <div>
          <span>To: </span>
          <Dropdown
            menu={{
              onClick: handleToCurrencySelect,
              items: currencyOptions,
            }}
            trigger={['click']}
            className="border-2 border-stone-600 rounded-lg p-1"
          >
            <Space>
              {toCurrency ? toCurrency : 'Select currency'}
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 w-3/4 ">
        <span>Amount to swap: </span>
        <input
          value={amountToSend}
          onChange={handleAmountToSendChange}
          className="border-2 border-stone-600 rounded pl-1"
          type="number"
          name="amount-to-send"
          id="amount-to-send"
          required
          style={{ height: '40px' }}
        />
        <div className="text-xs leading-none align-top italic pt-1">
          Input number only
        </div>
      </div>
      <div className="flex flex-col gap-1 w-3/4">
        <span>Amount to receive: </span>
        <input
          className={`rounded p-1 text-white ${
            amountToReceive ? 'bg-[#003366]' : ''
          }`}
          type="text"
          name="amount-to-receive"
          id="amount-to-receive"
          disabled
          value={amountToReceive ? `${amountToReceive} ${toCurrency}` : ''}
        />
      </div>

      <button
        type="button"
        className="border-none rounded p-2 w-3/4 bg-[#003366] text-white"
        onClick={handleSwapButtonClick}
      >
        Swap
      </button>
    </form>
  )
}

export default CurrencySwapForm
