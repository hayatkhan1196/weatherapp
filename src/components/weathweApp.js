import React, { useState, useEffect } from "react";
import "./css/style.css";

function WeathweApp() {
  //   API_Key = '77d96f43e93ba8d3059fd9e0298e76b6';
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(async () => {
    
   
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=429736441cf3572838aa10530929f7cd`;
    const response = await fetch(url);
    const res = await response.json();
    console.log(res);

    
   
    setCity(res.main);


    console.log("city is ",res?.sys?.country);
    const countryurl = `https://restcountries.eu/rest/v2/alpha/${res?.sys?.country}`;
    const countryresponse = await fetch(countryurl);
    const countryres = await countryresponse.json();
    console.log(countryres);
    setCountry(countryres.name);
  }, [search]);
 
  
  return (
    <div className="box">
      <h3 className="weathApp_heading">weather App</h3>
      <div className="inputData">
        <input
          type="search"
          //   value={search}
          className="inputField"
          placeholder="enter city name"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        {!city || !country ? (
          <p className="page_not_found">not data found</p>
        ) : (
          <div>
            <div className="info">
              <h1 className="location">
                <i class="fas fa-street-view"></i>
                {search}
              </h1>

              <h1 className="temperature">{country}</h1>
              <h1 className="temperature">{city.temp}°C</h1>

              <h3 className="temp_min_max">
                min:{city.temp_min}°C | max:{city.temp_max}°C{" "}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeathweApp;
