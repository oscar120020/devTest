import React, { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import DataGrid from "react-data-grid";
import { AppContext } from "../context/AppContext";
import { orderArrayBy } from "../helpers/orderArray";
import { filterArrayBy } from "../helpers/filterArray";
import styles from "./commond.module.css";

// Order Books Columns
const orderBookColumns = [
  { key: "price", name: "Price", width: 140 },
  { key: "size", name: "Size", width: 140 },
  { key: "side", name: "Side", width: 140 },
  { key: "timestamp", name: "Date" },
];

export const OrderBooks = () => {
  const { orderBookL2_25 } = useContext(AppContext);
  const [orderBy, setOrderBy] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOrderChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(evt.target.value);
  };

  const handleInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  // build order books rows
  const orderBookRows = orderArrayBy(
    filterArrayBy(orderBookL2_25, "price", inputValue),
    orderBy
  ).map((value) => ({
    price: value.price,
    size: value.size,
    side: value.side,
    timestamp: new Date(value.timestamp).toLocaleString(),
  }));

  return (
    <div className={styles.container}>
      <div className={styles.section_title}>
        <h1>OrderBookL2_25 (XBTUSD)</h1>
        <h2>
          <Link to="/">Go back</Link>
        </h2>
      </div>
      <div className={styles.filter_section}>
        <div className={styles.input_content}>
          <label htmlFor="order-by">Order OrderBook by:</label>
          <select name="order" id="order-by" onChange={handleOrderChange}>
            <option value="">__</option>
            <option value="price">Price</option>
            <option value="size">Size</option>
            <option value="side">Side</option>
            <option value="timestamp">Date</option>
          </select>
        </div>
        <div className={styles.input_content}>
          <label htmlFor="instrument-by">Find OrderBook:</label>
          <input
            type="text"
            placeholder="Find by price"
            onChange={handleInputValue}
          />
        </div>
      </div>
      <DataGrid
        className="rdg-light"
        columns={orderBookColumns}
        rows={orderBookRows}
      />
    </div>
  );
};
