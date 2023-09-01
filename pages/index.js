import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Home({ swal }) {
  const [city, setCity] = useState(""); // user's city
  const [locationDoc, setLocationDoc] = useState(null); //array
  const [weatherDoc, setWeatherDoc] = useState(null); //array
  const [selectedItem, setSelectedItem] = useState(null);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (weatherDoc) {
      message();
    }
  }, [weatherDoc]);

  async function submitForm(ev) {
    ev.preventDefault();
    const data = { city };
    const { data: responseDoc } = await axios.post("/api/location", data);
    setLocationDoc(responseDoc);
  }

  async function handleSelectItem(item) {
    setSelectedItem(item);
    const dataToSend = { lat: item.lat, lon: item.lon };
    const { data } = await axios.post("/api/weather", dataToSend);
    setWeatherDoc(data);
    setLocationDoc(null);
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
    const displayMessage = `${cityName}:  ${mainWeather}, ${description}.\nCurrent temperature is ${temp}°C.`;
    // await axios.post("/api/send-message", {
    //   body: clientMessage,
    //   recipient: "+2348067525679",
    // });
    setDisplay(displayMessage);
    console.log(clientMessage);
  }

  return (
    <>
      <div className=" bg-blue-900 w-screen h-screen flex flex-col items-center p-5">
        <div className=" text-2xl">Weather Alerts</div>
        <form className="" onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Enter your City"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />

          <button className=" p-3" type="submit">
            Enter
          </button>
        </form>
        {display === null || "" ? <p>No location yet</p> : <p> {display}</p>}
        {locationDoc === null ? (
          <p></p>
        ) : (
          <table className=" mt-5 border">
            <thead>
              <tr>
                <th className="border px-3">Name</th>
                <th className="border px-3">Country</th>

                <th className="border px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {locationDoc.map((item, index) => (
                <tr key={index}>
                  <td className="border px-3">{item.name}</td>
                  <td className="border px-3">{item.country}</td>

                  <td className="border px-3">
                    <button onClick={() => handleSelectItem(item)}>
                      Select & Send Data
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

export default withSwal(({ swal }, ref) => <Home swal={swal} />);
