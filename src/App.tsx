import { useEffect, useState } from "react";

import TableHeader from "./TableHeader"; // Import the TableHeader component
import "./App.css"; // Import your CSS file

const App = () => {
  const [tableData, setTableData] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const fetchHtmlTable = async () => {
      try {
        const response = await fetch(
          "https://github.com/rohanrvpatil/mp_reservoir_report/blob/main/response.html"
        );
        const htmlText = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        const table = doc.querySelector("table");

        setTableData(table);
        // if (table) {
        //   const rows = Array.from(table.querySelectorAll("tr"));

        //   // Extract the table data
        //   const parsedTableData: TableRow[] = rows.map((row) => {
        //     const cols = Array.from(row.querySelectorAll("td, th"));
        //     return cols.map((col) => col.textContent?.trim() || "");
        //   });

        //   setTableData(parsedTableData);
        // }
      } catch (error) {
        console.error("Error fetching or parsing the HTML:", error);
      }
    };

    fetchHtmlTable();
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
