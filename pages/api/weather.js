const axios = require("axios");

export default async function handler(req, res) {
  const openKey = process.env.OPENWEATHER_API;
  const { method } = req;

  //get the weather forecast

  if (method === "POST") {
    const { lat, lon } = req.body;
    const openweatherLink = `https://api.openweathermap.org/data/2.5/weather`;
    const {data} = await axios.get(openweatherLink, {
      params: {
        lat: lat,
        lon: lon,
        units:"metric",
        appid: openKey,
      },
    });
    res.json(data);
  }
}
