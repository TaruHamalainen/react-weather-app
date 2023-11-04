export default function Weather({ weather, onCurrentLocation }) {
  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `Today ${day}.${month}.${year} `;
  };
  return (
    <div>
      {weather.data && weather.data.sys && (
        <div className=" flex flex-col gap-5 rounded-lg p-6  ">
          <div className="flex flex-col gap-2">
            <p className="text-center font-extralight text-xl">{getDate()}</p>
            <h1 className="text-3xl font-extrabold text-center mb-2">
              {weather.data.name} | {weather.data.sys.country}
            </h1>
            <p className="text-center text-4xl font-bold">
              {Math.round(weather.data.main.temp)}°C
            </p>
            <p className="text-center font-semibold">
              {weather.data.weather[0].description}
            </p>

            <img
              className="w-40 h-40 self-center"
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].main}
            />
          </div>

          {weather.data.main && (
            <table className=" text-center font-semibold       ">
              <tbody>
                <tr>
                  <th>Feels like</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Wind</th>
                </tr>
                <tr>
                  <td> {Math.round(weather.data.main.feels_like)}°C</td>
                  <td>{Math.round(weather.data.main.temp_min)}°C</td>
                  <td>{Math.round(weather.data.main.temp_max)}°C</td>
                  <td>{weather.data.wind.speed}m/s</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}

      {weather.error && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-center font-semibold max-w-[50%]">
            {weather.message}
          </p>
          <button
            onClick={onCurrentLocation}
            className="bg-indigo-800 p-3 rounded-lg text-white font-semibold"
          >
            Use my current location
          </button>
        </div>
      )}
    </div>
  );
}
