import { useEffect, useState } from "react";

import TableHeader from "./TableHeader"; // Import the TableHeader component
import "./App.css"; // Import your CSS file

const App = () => {
  const [tableData, setTableData] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const apiUrl = "http://localhost:3001";

    fetch(`${apiUrl}/api/reservoir-water-level`, {
      method: "GET",
      credentials: "include", // This allows sending cookies
    })
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
            <tr style={{ border: "none" }}>
              <td colSpan={3} style={{ border: "none" }}>
                <div className="spinner"></div>{" "}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
