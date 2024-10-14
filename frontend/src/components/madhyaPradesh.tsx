import { useEffect, useState } from "react";

import TableHeader from "../TableHeader";
import "../App.css";

const MadhyaPradesh = () => {
  const [tableData, setTableData] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const fetchHtmlTable = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/rohanrvpatil/mp_reservoir_report/main/response.html"
        );
        const htmlText = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        const table = doc.querySelector("table");

        setTableData(table);
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

export default MadhyaPradesh;
