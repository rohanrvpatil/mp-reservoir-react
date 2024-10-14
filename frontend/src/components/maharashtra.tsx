import React from "react";

const Maharashtra: React.FC = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const day = String(yesterday.getDate()).padStart(2, "0");
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const year = yesterday.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const pdfUrl = `https://wrd.maharashtra.gov.in/Upload/PDF/Today's-Storage-ReportEng-${formattedDate}.pdf`;

  console.log("PDF URL:", pdfUrl);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <object data={pdfUrl} type="application/pdf" style={{ flex: 1 }}>
        <p>
          Alternative text - include a link
          <a href={pdfUrl}> to the PDF!</a>
        </p>
      </object>
    </div>
  );
};

export default Maharashtra;
