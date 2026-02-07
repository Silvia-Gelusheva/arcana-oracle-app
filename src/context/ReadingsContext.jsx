import { createContext, useState } from "react";

export const ReadingsContext = createContext();

export function ReadingsProvider({ children }) {
  const [readings, setReadings] = useState([]);

  function addReading(reading) {
    setReadings((prev) => [reading, ...prev]);
  }

  function clearReadings() {
    setReadings([]);
  }

  return (
    <ReadingsContext.Provider value={{ readings, addReading, clearReadings }}>
      {children}
    </ReadingsContext.Provider>
  );
}
