import { useEffect, useState } from "react";
import { motion ,spring} from "framer-motion";

export const WeatherApp = () => {
  const [city, setCity] = useState("Delhi");
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
        setCity("");
    }
     catch(err){
            setError(err.message);
        }
    finally{
        setLoading(false);
    }

  };

  useEffect(()=>{
    handleSearch();
  },[]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
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
        


        <div>
        {loading && <p className="text-blue-800">Loading...</p>}
         {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="bg-red-600 mt-4 px-4 py-2 rounded-sm text-white">{error}</motion.p>}

          {weather && (
            <motion.div 
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.8,ease:"easeOut"}}

            className="bg-white/50 rounded-xl hover:bg-white/80 text-center py-30 px-40 shadow-xl ">
              <h2 className="text-xl font-medium">
                {weather.name}, {weather.sys.country}
              </h2>
              <motion.img
              initial={{scale:0.8}}
              animate={{scale:1.2}}
              transition={{duration:0.8,ease:"easeInOut",delay:0.5}}
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={weather.weather[0].description}
      className="mx-auto"
    />

              <p className="text-lg capitalize">{weather.weather[0].main}</p>
              <p className="text-2xl font-bold">{weather.main.temp}°C</p>
            </motion.div>
          )}
        </div>
      </div>

    </>
  );
};
