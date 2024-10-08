// src/server.ts
import express from "express";
import cors from "cors";
import axios from "axios"; // Import axios

const app = express();
const PORT = 3000;

const corsOptions = {
  origin:
    "https://mp-reservoir-react-f3gzsqy1x-rohan-patils-projects-f1740550.vercel.app", // Replace with your frontend's Vercel URL
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/api/reservoir-water-level", async (req, res) => {
  const loginUrl = "http://eims1.mpwrd.gov.in/fcmreport/control/floodreport"; // URL to initiate a session
  const dataUrl =
    "http://eims1.mpwrd.gov.in/fcmreport/control/reservoirWaterLevel"; // URL to fetch the data

  try {
    const initialResponse = await axios.get(loginUrl, {
      withCredentials: true,
    });
    const setCookieHeader = initialResponse.headers["set-cookie"];
    if (!setCookieHeader) {
      throw new Error("No cookies returned from the server");
    }
    const sessionCookie = setCookieHeader[0].split(";")[0];

    const headers = {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-IN,en;q=0.9",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      Cookie: sessionCookie, // Use the fresh session cookie here
      Referer: "http://eims1.mpwrd.gov.in/fcmreport/control/floodreport",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    };
    const response = await axios.get(dataUrl, { headers });
    res.send(response.data); // Send the HTML/text response to the frontend
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
