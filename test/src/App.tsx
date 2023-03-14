import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataGrid from "react-data-grid";
import { getAnnouncement } from "./api/appApi";
import { AppContext } from "./context/AppContext";
import { Announcement } from "./interfaces/appInterfaces";

import styles from "./app.module.css";
import "react-data-grid/lib/styles.css";

// Order Books Columns
const orderBookColumns = [
  { key: "price", name: "Price", width: 140 },
  { key: "size", name: "Size", width: 140 },
  { key: "side", name: "Side", width: 140 },
  { key: "timestamp", name: "Date" },
];

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

function App() {
  // Socket state
  const { orderBookL2_25, instruments } = useContext(AppContext);

  // Api state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Get Announcements data from local proxy server
    getAnnouncement()
      .then((data) => {
        setAnnouncements(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // build order books rows
  const orderBookRows = orderBookL2_25.map((value) => ({
    price: value.price,
    size: value.size,
    side: value.side,
    timestamp: new Date(value.timestamp).toLocaleString(),
  }));

  // build instruments rows
  const instrumentsRows = instruments.map((value) => ({
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
      <div>
        <h1>Announcement</h1>
        {announcements.map((notice) => (
          <div key={notice.id} className={styles.news}>
            <a href={notice.link} target="_blank" rel="noopener noreferrer">
              <h2>{notice.title}</h2>
            </a>
            <div dangerouslySetInnerHTML={{ __html: notice.content }}></div>
            <p className={styles.news_date}>
              {new Date(notice.date).toUTCString()}
            </p>
          </div>
        ))}
      </div>

      <h1>In real time</h1>

      
      <div className={styles.table_title}>
        <h2>OrderBookL2_25 (XBTUSD)</h2>
        <h3>
          <Link to="/order-books">Expand</Link>
        </h3>
      </div>
      <DataGrid
        className="rdg-light"
        columns={orderBookColumns}
        rows={orderBookRows}
      />

      <div className={styles.table_title}>
        <h2>Instruments</h2>
        <h3>
          <Link to="/instruments">Expand</Link>
        </h3>
      </div>
      <DataGrid
        className="rdg-light"
        columns={instrumentsColumns}
        rows={instrumentsRows}
      />
    </div>
  );
}

export default App;
