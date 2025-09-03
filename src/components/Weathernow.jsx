import React from 'react';
import { useState } from 'react';

const Weathernow = () => {
  const[city,setcity]=useState("");
  const[weather,setweather]=useState(null);
  const[loading,setloading]=useState(false);
  const[error,seterror]=useState("");

  async function handleSearch(){
    if(!city.trim()) return;
    setloading(true);
    seterror("");
    setweather(null);
 
  try{
    const getRes=await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const getData=await getRes.json();
    console.log(getData);
    if(!getData.results || getData.results.length===0){
      seterror("Sorry City Not Found...");
      setloading(false);
      return;
    }
    const { latitude, longitude, name, country,admin1 } = getData.results[0];

    const weatherRes=await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData=await weatherRes.json();
    console.log(weatherData);
    setweather({
      city: name,
        country,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        time: weatherData.current_weather.time,
    });
    setcity("");
  }catch (e){
    seterror("Something Went Wrong");
  }
  finally{
    setloading(false);
  }
}

 function handleReset() {
   setweather(null);
  }

  return (
    <div
     className='bg-gray-400/30 shadow-2xl rounded-xl 
                  w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 
                   h-120 sm:88 md:h-120 lg:h-[28rem] 
                  flex items-center mt-10 flex-col gap-8 '>
        <h1 className='font-bold text-4xl mt-10'> <u>Weather Now</u></h1>
        <div className='flex gap-3'>
            <input type="text" 
            className=' rounded-lg  text-black border-1 mx-auto hover:border-2 ' 
            placeholder=' Enter City'
            value={city}
            onChange={(e) => setcity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}  />
            <button onClick={handleSearch} className='cursor-pointer rounded-lg border-1 p-2 mx-auto hover:border-2 transition-all
            hover:animate-pulse'>Search</button>
        </div>
        {loading && <p className="mt-4 text-center">Loading...</p>}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}

        {weather &&(
          <div>
            <div className='flex-col gap-3 text-center'>
              <h3>({weather.time})</h3>
              <h3 className='font-bold text-4xl'>{weather.city}, {weather.country}</h3>
              <h1 className='font-bold text-4xl mt-7'>{weather.temperature}&deg;C</h1>
            
            </div>
            <div className='flex-col text-center'>
              <h1>Wind-Speed: {weather.windspeed} km/h</h1>
              <button className='cursor-pointer rounded-lg border-1 p-2 mx-auto mt-8 hover:border-2 hover:animate-pulse transition-all ' onClick={handleReset}>reset</button>
            </div>
          </div>
        )}
        
    </div>
  );
}

export default Weathernow;
