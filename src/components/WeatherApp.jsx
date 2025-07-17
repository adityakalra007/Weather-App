import { useState } from "react";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async() => {

    const API_KEY = "b3c7b226b8e0258a86622192fa590f56";
    if(!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if(!response.ok){
            throw new Error("City Not Found");
        }

        const data = await response.json();
        setWeather(data);
    }
     catch(err){
            setError(err.message);
        }
    finally{
        setLoading(false);
    }

  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
        <h1 className="text-3xl font-semibold mb-6">Weather App</h1>

        <div className="flex space-x-2 mb-6">
        <form onSubmit={(e)=>{e.preventDefault();handleSearch();}} className="p-3">

        
          <input
            type="text"
            placeholder="Enter City..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className="px-4 py-2 mr-3 rounded-md outline-1 outline-blue-800 focus:outline-2 focus:outline-blue-500"
          ></input>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition cursor-pointer"
          >
            Search
          </button>
          </form>
        </div>
        


        <div className="mt-4">
        {loading && <p className="text-blue-800">Loading...</p>}
         {error && <p className="text-red-600 mt-4">{error}</p>}

          {weather && (
            <div className="bg-white/50 rounded-xl hover:bg-white/80 text-center p-10 px-20 shadow-xl ">
              <h2 className="text-xl font-medium">
                {weather.name}, {weather.sys.country}
              </h2>
              <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={weather.weather[0].description}
      className="mx-auto"
    />

              <p className="text-lg capitalize">{weather.weather[0].main}</p>
              <p className="text-2xl font-bold">{weather.main.temp}°C</p>
            </div>
          )}
        </div>
      </div>

    </>
  );
};
