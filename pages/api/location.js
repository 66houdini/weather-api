const axios = require("axios");

export default async function handle(req, res) {
  const openKey = process.env.OPENWEATHER_API;
  const { method } = req;
  //convert location to latitiude and longitude using the geocoding API

  if (method === "POST") {
    const { city} = req.body;
    const openweatherLink = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${10}&appid=${openKey}`;
    const {data} = await axios.get(openweatherLink);
    res.json(data);
  }

}
