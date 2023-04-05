import axios from "axios"
import { useEffect, useState } from "react"
import WeatherItem from './WeatherItem'
import store from '../../../../store/store';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components";

export default function WeatherList(){
    const [weathers, setWeathers] = useState(null);
    const API_KEY =  process.env.REACT_APP_WEATHER_API_KEY;
    const [loading, setLoading] = useState(weathers === null ? false : true);
    const flight = store.getState().flight;
    const [destination, setDestination] = useState(flight.destination);
    useEffect(() => {
        if(destination === null || !destination.hasOwnProperty("lat") || destination.lat === '') return;
        setLoading(true);
        setDestination(destination);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${destination.lat}&lon=${destination.lng}&appid=${API_KEY}&lang=kr`).then((res) => {
            setWeathers(res.data.list)
            setLoading(false);
        }).catch((err) => console.log(err))
    }, [destination])
    return(

        //destination에 위도 경도가 없거나 위도 경도가 ''이면 안보며 줌
        <div>
            {destination.lat && <>
                <div style={{fontSize: '16px', fontWeight: '600', margin: '0px 0px 8px 14px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>{destination.name}의 날씨 {loading ? <LoadingSpinner><AiOutlineLoading3Quarters className="spinner" size={16}/></LoadingSpinner> : null}</div>
                <div style={{display: 'flex'}}>
                    {weathers && weathers.map((weather) => {
                        return Number(weather.dt_txt.split(" ")[1].split(":")[0]) % 12 === 0 ? <WeatherItem key={weather.dt} weather={weather}/> : null
                    })
                    }
                </div>
                <br></br>
            </>}
        </div>
    )
}

const LoadingSpinner = styled.span`
    margin-bottom: -4px;
    margin-left: 8px;
    .spinner {
        animation: rotate 2s infinite linear;
        @keyframes rotate {
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(360deg);
            }
        }
    }
`;