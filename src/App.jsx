import React, { useState, useEffect } from "react";
import {
  BsFillCloudHaze2Fill,
  BsFillGeoAltFill,
  BsWind,
  BsDropletHalf,
  BsSearch,
} from "react-icons/bs";

import "./App.css";

function App() {
  const [location, setLocation] = useState(false);
  const [cityName, setCityname] = useState("");
  const [city, setCity] = useState("");
  // const [tempMax, settempMax] = useState("")
  // const [tempMin, settempMin] = useState("")
  const [tempAt, settempAt] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [situation, setSituation] = useState("");
  // const [dataRequired, setdataRequired] = useState({})
  const valorLido = document.querySelector("#local");
  const API_KEY = "e790f3e73d7f335a6742c7666990b403";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

  let dataRequired;

  function handleChange(e) {
    setCity(e.target.value);
  }

  async function buscar(e) {
    e.preventDefault();
    setCity(valorLido.value);
    await fetch(`${API_URL}q=${city}&units=metric&appid=${API_KEY}&lang=pt`)
      .then((response) => response.json())
      .then((data) => (dataRequired = data));

    //  settempMax(dataRequired.main.temp_max);
    //  settempMin(dataRequired.main.temp_min);

    settempAt(dataRequired.main.temp);
    setWind(dataRequired.wind.speed);
    setHumidity(dataRequired.main.humidity);
    setSituation(dataRequired.weather[0].description);
    setCityname(dataRequired.name);
    valorLido.value = "";
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latAtual = position.coords.latitude;
      const longAtual = position.coords.longitude;
      let dataO;
      await fetch(
        `${API_URL}lat=${latAtual}&lon=${longAtual}&units=metric&appid=${API_KEY}&lang=pt`
      )
        .then((response) => response.json())
        .then((data) => (dataO = data));
      // settempMax(dataO.main.temp_max);
      // settempMin(dataO.main.temp_min);
      settempAt(dataO.main.temp);
      setWind(dataO.wind.speed);
      setHumidity(dataO.main.humidity);
      setSituation(dataO.weather[0].description);
      setCityname(dataO.name);
      setLocation(true);
    });
  }, []);

  if (!location) {
    return <h1>Você necessita habilitar a localização no browser</h1>;
  } else {
    return (
      <div className="card">
        <header>
          <div className="logo">
            <h1>
              <BsFillCloudHaze2Fill />
              C.O.W
            </h1>
          </div>
          <h2>
            <BsFillGeoAltFill />
            {cityName.toUpperCase()}
          </h2>
        </header>
        <main>
          <div className="cardS">
            <div className="principal">
              <h1 className="graus">{Math.floor(tempAt)}°C</h1>
              <h3 className="sClima">{situation.toUpperCase()}</h3>
            </div>
            <div className="windumity">
              <p className="wind">
                <BsWind /> {wind}m/s
              </p>
              <p className="drop">
                <BsDropletHalf /> {humidity}%
              </p>
            </div>
            {/* <div className='secundario'>
                <p className='max'>Maxima</p>
                <p className='min'>Minima</p>
                <p className='valMax'>{tempMax}°C</p>
                <p className='valMin'>{tempMin}°C</p>
              </div> */}
            <form>
              <input
                type="text"
                placeholder="Nome da cidade ou país"
                id="local"
                autoComplete="off"
                onChange={handleChange}
              />
              <button type="submit" onClick={buscar}>
                <BsSearch />
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
