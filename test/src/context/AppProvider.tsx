import React, { useEffect, useReducer } from "react";
import { Instrument, OrderBookL2_25 } from "../interfaces/appInterfaces";
import { AppContext } from "./AppContext";
import { appReducer } from "./appReducer";

export interface SocketState {
  instruments: Instrument[];
  orderBookL2_25: OrderBookL2_25[];
}

const INITIAL_STATE: SocketState = {
  instruments: [],
  orderBookL2_25: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  useEffect(() => {
    // Create websocket instance
    const ws = new WebSocket("wss://ws.bitmex.com/realtime");

    // Connection ready
    ws.onopen = () => {
      console.log("Connected to WebSocket");

      // Emit subscription to instrument and orderBookL2_25:XBTUSD
      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: ["instrument", "orderBookL2_25:XBTUSD"],
        })
      );
    };

    // Listen all message
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle orderBookL2_25 data
      if (data.table === "orderBookL2_25") {
        if (data.action === "insert" || data.action === "partial") {
          dispatch({ type: "add-orderBook", payload: data.data });
        } else if (data.action === "update") {
          dispatch({ type: "update-orderBook", payload: data.data });
        } else if (data.action === "delete") {
          dispatch({ type: "delete-orderBook", payload: data.data });
        }
      }

      // Handle instrument data
      if (data.table === "instrument") {
        if (data.action === "partial") {
          dispatch({ type: "add-instrument", payload: data.data });
        } else if (data.action === "update") {
          dispatch({ type: "update-instrument", payload: data.data });
        }
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
