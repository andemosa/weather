if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const API_KEY = process.env.OPENWEATHER_API_KEY;
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.value}&units=metric&appid=${API_KEY}`;
  axios({
    url,
    responseType: "json",
  })
    .then((data) => res.json(data.data))
    .catch((err) => {
      if (err.response === undefined) {
        return res.json({ cod: 500 });
      }
      res.json({ cod: err.response.status });
    });
});

app.post("/coordinates", (req, res) => {
  const { latitude: lat, longitude: lon } = req.body;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  axios({
    url,
    responseType: "json",
  })
    .then((data) => res.json(data.data))
    .catch((err) => {
      if (err.response === undefined) {
        return res.json({ cod: 500 });
      }
      res.json({ cod: err.response.status });
    });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
