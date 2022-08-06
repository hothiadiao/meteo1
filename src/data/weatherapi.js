import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey ='3aa263dc7aed6fd46df00228680fb46b';

export const getWeatherData = async (cityname) => {
    try{
        const {data} = await axios.get(baseUrl + `q=${cityname}&units=imperial&appid=${apiKey}`);
        return data;
    }catch(error) {
          throw error;
    }
}