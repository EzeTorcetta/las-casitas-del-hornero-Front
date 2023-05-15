import { useState } from "react";
import style from "./Clima.module.css";

const VITE_API_KEY = "bf29d6808d85484fb42200108231005";
const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${VITE_API_KEY}&q=`;

export default function Clima() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    setLoading(true);
    setError({
      error: false,
      message: "",
    });

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };
      const response = await fetch(`${API_WEATHER}${city}`);
      const data = await response.json();
      if (data.error) throw { message: data.error.message };

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });
    } catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 className={style.h2}>Clima</h2>
      <form className={style.form} autoComplete="off" onSubmit={onSubmit}>
        <input
          className={style.input}
          id="city"
          placeholder="Ciudad *"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></input>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <button className={style.button} type="submit">
          Buscar
        </button>
      </form>

      {weather.city && (
        <div className={style.result}>
          <h4>
            {weather.city},{weather.country}
          </h4>
          <div>
            <img src={weather.icon} alt={weather.conditionText} />
          </div>
          <h3>{weather.temp}ºC</h3>
          <h4>{weather.condition}</h4>
        </div>
      )}

      <p className={style.powered}>
        Powered by: <a href="https://www.weatherapi.com">WeatherAPI</a>{" "}
      </p>
    </div>
  );
}
