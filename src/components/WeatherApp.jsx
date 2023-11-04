import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";
import Form from "./Form";

export default function WeatherApp() {
  const [weather, setWeather] = useState({
    data: {},
    error: false,
    message:
      "Geolocation not supported by this browser, please search country / city or allow geolocation",
  });
  const [coordinates, setCoordinates] = useState(null);
  const [input, setInput] = useState("");
  const apikey = "f586b9cca2ff00e7eeb936c809e342fa";

  // Getting users current location
  useEffect(() => {
    getLocation();
  }, []);

  // fetching data from API
  useEffect(() => {
    fetchData();
  }, [coordinates]);

  // Getting current location
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        if (latitude && longitude) setCoordinates({ latitude, longitude });
      }),
        (error) => {
          console.log("Error getting user location: ", error);
        };
    } else {
      console.log("Geolocation is not supported by this browser");
      setWeather({
        ...weather,
        error: true,
      });
    }
  };

  // Fetching data from API
  const fetchData = async () => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    try {
      let res = await axios.get(url, {
        params: {
          lat: coordinates.latitude,
          lon: coordinates.longitude,
          units: "metric",
          appid: apikey,
        },
      });
      setWeather({ data: res.data, error: false, message: null });
    } catch (error) {
      console.log(error);
      setWeather({ ...weather, error: true });
    }
  };

  const onInputChange = (value) => {
    setInput(value);
  };

  const onSubmit = async (event) => {
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
        setWeather({ data: res.data, error: false, message: null });
        setInput("");
      })
      .catch((error) => {
        setWeather({
          data: null,
          error: true,
          message: "City or country not found 😔, Please try again",
        });
        setInput("");
      });
  };

  return (
    <div className="container max-w-sm mx-auto  py-14 ">
      <div className=" flex flex-col gap-5  p-6 bg-slate-50 shadow-lg rounded-lg ">
        <Form
          input={input}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          location={coordinates}
        />
        <Weather
          weather={weather}
          onCurrentLocation={fetchData}
          location={coordinates}
        />
      </div>
    </div>
  );
}
