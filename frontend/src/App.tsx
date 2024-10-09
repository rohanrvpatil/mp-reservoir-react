import { useEffect, useState } from "react";
import axios from "axios";

import TableHeader from "./TableHeader"; // Import the TableHeader component
import "./App.css"; // Import your CSS file

const App = () => {
  const [tableData, setTableData] = useState<HTMLElement | null>(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const apiUrl = "https://mp-reservoir-react-backend-po5ru0hgk.vercel.app";

    fetch(`${apiUrl}/reservoir-water-level`)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const table = doc.querySelector("table");

        if (table) {
          setTableData(table);
          localStorage.setItem("tableData", table.outerHTML);
        } else {
          console.error("No table found in the response.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const savedTableData = localStorage.getItem("tableData");
    if (savedTableData) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(savedTableData, "text/html");
      setTableData(doc.body.firstChild as HTMLElement);
    }
  }, []);

  return (
    <div className="table-container">
      <table className="custom-table">
        {tableData && <TableHeader />}
        <tbody>
          {tableData ? (
            Array.from(tableData.querySelectorAll("tr"))
              .slice(4) // Skip the first five rows (headers)
              .map((row, index) => (
                <tr key={index}>
                  {Array.from(row.querySelectorAll("td")).map(
                    (cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        dangerouslySetInnerHTML={{ __html: cell.innerHTML }} // Preserve formatting
                      />
                    )
                  )}
                </tr>
              ))
          ) : (
            <div className="spinner"></div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
