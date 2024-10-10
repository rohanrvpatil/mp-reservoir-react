import { useEffect, useState } from "react";

import TableHeader from "./TableHeader"; // Import the TableHeader component
import "./App.css"; // Import your CSS file

const App = () => {
  const [tableData, setTableData] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const apiUrl = "https://mp-reservoir-react-backend.vercel.app";
    const timeoutDuration = 500000; // Set the timeout duration in milliseconds

    // Create an AbortController instance
    const controller = new AbortController();
    const { signal } = controller;

    // Set a timeout to abort the fetch request
    const timeoutId = setTimeout(() => {
      controller.abort(); // Cancel the fetch request
      console.error("Fetch request timed out.");
    }, timeoutDuration);

    fetch(`${apiUrl}/api/reservoir-water-level`, {
      method: "GET",
      credentials: "include", // This allows sending cookies
      signal, // Pass the signal to the fetch request
    })
      .then((response) => {
        // Clear the timeout if the fetch request completes successfully
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
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
      .catch((error) => {
        if (error.name === "AbortError") {
          console.error("Fetch aborted due to timeout.");
        } else {
          console.error("Error:", error);
        }
      });

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timeoutId);
      controller.abort(); // Abort the fetch request if the component unmounts
    };
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
