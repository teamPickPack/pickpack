import axios from "axios"
import { useEffect, useState } from "react"
import Weather from './Weather'

export default function WeatherList(){
    const [location] = useState({'longitude' : 127.0, 'latitude': 37.583328})
    const [weathers, setWeathers] = useState(null)
    const API_KEY =  '68b6cfc53b3a318fcc1da44f6ed04f32'
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&lang=kr`).then((res) => {
            setWeathers(res.data.list)
        }).catch((err) => console.log(err))
    }, [location])
    return(
        <div style={{border: '1px solid purple'}}>
            <div style={{fontSize: '20px', fontWeight: 'bold', margin: '0px 0px 8px 14px'}}>OO의 날씨</div>
            <div style={{display: 'flex'}}>
                {weathers && weathers.map((weather) => {
                    return Number(weather.dt_txt.split(" ")[1].split(":")[0]) % 12 === 0 ? <Weather key={weather.dt} weather={weather}/> : null
                })
                }
            </div>
        </div>
    )
}