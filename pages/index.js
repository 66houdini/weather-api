import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useKindeAuth();
  const [city, setCity] = useState("");
  const [locationDoc, setLocationDoc] = useState(null); //array
  const [weatherDoc, setWeatherDoc] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {}, [locationDoc]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  async function submitForm(ev) {
    ev.preventDefault();
    const data = { city };
    const responseData = await axios.post("/api/location", data);
    const responseDoc = responseData.data;
    setLocationDoc(responseDoc);
  }

  function handleSelectItem(item) {
    setSelectedItem(item);
  }

  async function message() {
    const weatherData = weatherDoc?.weather[0]; // Extract the weather object from the array
    const mainWeather = weatherData?.main; // "Rain"
    const description = weatherData?.description; // "light rain"

    const mainData = weatherDoc?.main;
    const temp = mainData?.temp; // 27.43
    const cityName = weatherDoc?.name; // "Lagos"

    // Construct a message for the user
    const clientMessage = `DAILY FORECAST\nWeather in ${cityName}: ${mainWeather} (${description}).\nCurrent temperature is ${temp}°C.`;

    await axios.post("/api/send-message", {
      body: clientMessage,
      recipient: "+2348067525679",
    });

    console.log(clientMessage);
  }
  async function sendSelectedData() {
    if (selectedItem) {
      const dataToSend = { lat: selectedItem.lat, lon: selectedItem.lon };
      const { data } = await axios.post("/api/weather", dataToSend);
      setWeatherDoc(data);
      message();
      // const responseData = await axios.post("/api/weather", dataToSend);
      // const weatherDoc = responseData.data;
      // console.log(weatherDoc);
    }
  }
  return (
    <>
      <div className=" bg-blue-900 w-screen h-screen flex flex-col items-center p-5">
        <div className=" text-2xl">Weather Alerts</div>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Enter your City"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />

          <button type="submit">Enter</button>
        </form>
        {locationDoc === null ? (
          <p>Loading....</p>
        ) : (
          <table className=" mt-5 border">
            <thead>
              <tr>
                <th className="border px-3">Name</th>
                <th className="border px-3">Country</th>
                <th className="border px-3">Latitude</th>
                <th className="border px-3">Longitude</th>
                <th className="border px-3">State</th>
                <th className="border px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {locationDoc.map((item, index) => (
                <tr key={index}>
                  <td className="border px-3">{item.name}</td>
                  <td className="border px-3">{item.country}</td>
                  <td className="border px-3">{item.lat}</td>
                  <td className="border px-3">{item.lon}</td>
                  <td className="border px-3">{item.state}</td>
                  <td className="border px-3">
                    <button onClick={() => handleSelectItem(item)}>
                      Select
                    </button>
                  </td>
                  <td>
                    <button onClick={sendSelectedData}>
                      Send Selected Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
