import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [weather, setWeather] = useState({ data: {}, error: false });
  const [coordinates, setCoordinates] = useState(null);
  const [input, setInput] = useState("");
  const apikey = "f586b9cca2ff00e7eeb936c809e342fa";

  // Get user coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      }),
        (error) => {
          console.error("Error getting user location:", error);
        };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  //
  const handleUseCurrentLocation = async (event) => {
    event.preventDefault();
    const url = "https://api.openweathermap.org/data/2.5/weather";

    await axios
      .get(url, {
        params: {
          lat: coordinates.latitude,
          lon: coordinates.longitude,
          units: "metric",
          appid: apikey,
        },
      })
      .then((res) => {
        setWeather({ data: res.data, error: false });
        setInput("");
      })
      .catch((error) => {
        setWeather({ ...weather, error: true });
        setInput("");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "https://api.openweathermap.org/data/2.5/weather";

    await axios
      .get(url, {
        params: {
          q: input,
          units: "metric",
          appid: apikey,
        },
      })
      .then((res) => {
        setWeather({ data: res.data, error: false });
        setInput("");
      })
      .catch((error) => {
        setWeather({ ...weather, error: true });
        setInput("");
      });
  };

  return (
    <div className=" container mx-auto  py-14 ">
      <div className="max-w-lg flex flex-col gap-4 mx-auto p-3  bg-slate-200">
        <button
          onClick={handleUseCurrentLocation}
          className="bg-slate-500 p-3 rounded-lg self-center"
        >
          Get my location
        </button>
        <form onSubmit={handleSubmit} className="bg-slate-50 flex  ">
          <input
            className="w-full"
            type="text"
            placeholder="search city"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button className="self-center bg-slate-300 p-3">Go</button>
        </form>

        {weather.data && (
          <div>
            <h1>{weather.data.name}</h1>
          </div>
        )}
        {weather.data.error && (
          <div>
            <p>Not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
