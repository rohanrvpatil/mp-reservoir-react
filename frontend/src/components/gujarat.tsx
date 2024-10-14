import React from "react";

const PdfViewer: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <iframe
        src="https://cdn.jsdelivr.net/gh/rohanrvpatil/mp_reservoir_report@main/files/gujarat_reservoir_report.pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      >
        This browser does not support PDFs. Please download the PDF to view it:
        <a href="https://cdn.jsdelivr.net/gh/rohanrvpatil/mp_reservoir_report@main/files/gujarat_reservoir_report.pdf">
          Download PDF
        </a>
      </iframe>
    </div>
  );
};

export default PdfViewer;
