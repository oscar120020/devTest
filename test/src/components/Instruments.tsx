import React, { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom"
import DataGrid from "react-data-grid";
import { AppContext } from "../context/AppContext";
import { filterArrayBy } from "../helpers/filterArray";
import { orderArrayBy } from "../helpers/orderArray";
import styles from './commond.module.css';

// Instruments Columns
const instrumentsColumns = [
  { key: "symbol", name: "Symbol", width: 120 },
  { key: "markPrice", name: "Market price", width: 150 },
  { key: "lastPrice", name: "Last price", width: 120 },
  { key: "prevPrice24h", name: "Previous price 24h", width: 150 },
  { key: "lastChangePcnt", name: "Last change percent", width: 200 },
  { key: "tickSize", name: "Tick size", width: 120 },
  { key: "timestamp", name: "Date" },
];

export const Instruments = () => {
  const { instruments } = useContext(AppContext);
  const [instrumentBy, setInstrumentBy] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInstrumentChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setInstrumentBy(evt.target.value);
  }

  const handleInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  // build instruments rows
  const instrumentsRows = orderArrayBy(filterArrayBy(instruments, 'symbol', inputValue), instrumentBy).map((value) => ({
    symbol: value.symbol,
    markPrice: value.markPrice,
    lastPrice: value.lastPrice,
    prevPrice24h: value.prevPrice24h,
    lastChangePcnt: value.lastChangePcnt,
    tickSize: value.tickSize,
    timestamp: new Date(value.timestamp).toLocaleString(),
  }));

  return (
    <div className={styles.container}>
      <div className={styles.section_title}>
        <h1>Instruments</h1>
        <h2>
          <Link to='/'>Go back</Link>
        </h2>
      </div>
      <div className={styles.filter_section}>
        <div className={styles.input_content}>
          <label htmlFor="instrument-by">Order Instrument by:</label>
          <select name="instrument" id='instrument-by' onChange={handleInstrumentChange}>
            <option value="">__</option>
            <option value="symbol">Symbol</option>
            <option value="markPrice">Market price</option>
            <option value="lastPrice">Last price</option>
            <option value="prevPrice24h">Previous price 24h</option>
            <option value="lastChangePcnt">Last change percent</option>
            <option value="tickSize">Tick size</option>
            <option value="timestamp">Date</option>
          </select>
        </div>
        <div className={styles.input_content}>
          <label htmlFor="instrument-by">Find Instrument:</label>
          <input type="text" placeholder="Find by symbol" onChange={handleInputValue} />
        </div>
      </div>
      <DataGrid
        className="rdg-light"
        columns={instrumentsColumns}
        rows={instrumentsRows}
      />
    </div>
  );
};
