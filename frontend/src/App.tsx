import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import "./App.css";

// components
import MadhyaPradesh from "./components/madhyaPradesh";
import Maharashtra from "./components/maharashtra";
// import Gujarat from "./components/gujarat";

import PdfViewer from "./components/gujarat";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const pdfUrl =
    "https://wrd.maharashtra.gov.in/Upload/PDF/Today's-Storage-ReportEng-13-10-2024.pdf";

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label="Madhya Pradesh"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: "bold",
            fontSize: 16,
          }}
        />
        <Tab
          label="Maharashtra"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: "bold",
            fontSize: 16,
          }}
        />
        <Tab
          label="Gujarat"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: "bold",
            fontSize: 16,
          }}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <MadhyaPradesh />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Maharashtra />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PdfViewer />
      </TabPanel>
    </Box>
  );
};

export default App;
