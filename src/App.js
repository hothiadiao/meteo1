import React, {useState, useEffect} from 'react';
import './App.css';
import { getWeatherData } from './data/weatherapi';
import  {ScaleLoader} from 'react-spinners';
import './index.css'

function App() {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kolda');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try{
      setLoading(true);
      const data = await getWeatherData(city);
      setWeatherData(data);
      setLoading(false);
    }catch(error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  `;
  useEffect(() => {
    getData();
  }, []);
return (
  <div className="App">
    <div className="card">
    <h2 className="title"><i className="fa fa-cloud"></i>Application météo #HothiaDIAO</h2>
    <div className="search-form">
    <input type="text"  value={city} onChange={(e) => setCity(e.target.value)} placeholder="Entrer le nom de la ville"/>
    <button type="button" onClick={() => getData()}>Envoyer</button>
    </div>
    {loading ? (
    <div className="loader-container">
   <ScaleLoader
       css={override}
       size={200}
       color={"#FFF"}
       loading= {loading}
       />
    </div> 
    ) : (
      <>
       {weatherdata !== null ? (
      <div className="main-container">
      <h4>Conditions météorologiques en direct</h4>
      <div className="weather-icon">
      <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt="imgicon"/>
      </div>
      <h3>{weatherdata.weather[0].main}</h3>
      <div className="temprature">
      <h1>{parseFloat(weatherdata.main.temp).toFixed(1)}&deg;C</h1>
      </div>
      <div className="location">
      <h3><i className="fa fa-street-view"></i>{weatherdata.name} | {weatherdata.sys.country}</h3>
      </div>
      <div className="temprature-range">
      <h3>Min: {parseFloat(weatherdata.main.temp_min).toFixed(1)}&deg;C
       || Max: {parseFloat(weatherdata.main.temp_max).toFixed(1)}&deg;C 
       || Humidity: {weatherdata.main.humidity}%</h3>
      </div>
      </div>
    ) : null}
    
      </>
    )}
    </div>
  </div>
);

} 
 
export default App ;