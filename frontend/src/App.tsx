import { useEffect, useState } from "react";

import TableHeader from "./TableHeader"; // Import the TableHeader component
import "./App.css"; // Import your CSS file

const App = () => {
  const [tableData, setTableData] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const apiUrl = "https://mp-reservoir-react-backend.vercel.app";

    const fetchDataWithTimeout = async (
      url: string,
      options?: RequestInit,
      timeout: number = 500000
    ): Promise<Response> => {
      // Create a promise that rejects after the timeout
      const timeoutPromise = new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      );

      // Make the fetch request
      const fetchPromise = fetch(url, options);

      // Race between the fetch request and the timeout
      return Promise.race([fetchPromise, timeoutPromise]);
    };

    fetchDataWithTimeout(`${apiUrl}/api/reservoir-water-level`, {
      method: "GET",
      credentials: "include", // This allows sending cookies
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        console.log(doc);
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
