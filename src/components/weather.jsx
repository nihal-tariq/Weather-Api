import React, {useEffect, useRef, useState} from 'react';
import search_icon from "../assets/search.png"
import cloud_icon from "../assets/cloud.png"
import clear_icon from "../assets/clear.png"
import humidity_icon from "../assets/humidity.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import rain_icon from "../assets/rain.png"
import drizzle_icon from "../assets/drizzle.png"

const Weather= ()=>{
    const inputRef = useRef()

     const [weatherData, setWeatherData] = useState(false);

     const allIcons = {
         "01d": clear_icon,
         "01n": clear_icon,
         "02d": cloud_icon,
         "02n": cloud_icon,
         "03d": cloud_icon,
         "03n": cloud_icon,
         "04d": drizzle_icon,
         "04n": drizzle_icon,
         "09d": rain_icon,
         "09n": rain_icon,
         "10d": rain_icon,
         "10n": rain_icon,
         "13d": snow_icon,
         "13n": snow_icon,

     }
    const search = async (city)=>{
         if(city===""){
             alert("Enter city name");
             return;
         }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon= allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch(error){
             setWeatherData(false);
             alert("Enter correct city")
             console.error("Error in fetching data");

        }
    }

    useEffect(()=>{
        search('Lahore');
    },[])

    return(<>
        <div className="weather self-center p-10 flex flex-col w-fit items-center rounded-md bg-gradient-to-r from-blue-950 to-blue-500">
            <div className="search-bar flex items-center gap-4">
                <input ref={inputRef} type='text'  className="h-10 outline-0 b-r rounded-lg pl-2 bg-blue-100" placeholder="Search"/>
                <img src={search_icon} alt="search_icon"  onClick={()=>search(inputRef.current.value)} className="w-12 p-4 rounded-full bg-blue-100 cursor-pointer"/>
            </div>
            {weatherData?<>
                <img src={weatherData.icon} alt='snow' className="w-40 my-7 mx-0"/>
                <span className="text-white text-3xl leading-none">{weatherData.temperature} &deg;C</span>
                <span className="text-white text-lg ">{weatherData.location}</span>

                <div className="w-auto mt-16 text-white flex justify-between gap-4">

                    <div className='flex items-start gap-4 text-lg w-1/2 justify-center'>
                        <img src={humidity_icon} alt='humidity_icon' className="w-6 mt-2"/>
                        <div className="flex flex-col">
                            <p>{weatherData.humidity} %</p>
                            <span className="text-sm">Humidity</span>
                        </div>
                    </div>

                    <div className='flex items-start gap-4 text-lg w-1/2 justify-center'>
                        <img src={wind_icon} alt="wind_icon" className="w-6 mt-2"/>
                        <div className="flex flex-col">
                            <p>{weatherData.windspeed}km/h </p>
                            <span className="text-sm ">Wind Speed</span>
                        </div>
                    </div>

                </div>

            </>:<></>}


        </div>


        </>)

}

export default Weather;