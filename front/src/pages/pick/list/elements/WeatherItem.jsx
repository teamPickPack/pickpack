import styled from "styled-components"

export default function Weather({weather}){
    const date = weather.dt_txt.split(" ")[0]
    const time = weather.dt_txt.split(" ")[1]
    return(
        <WeatherBox>
            <Info>
                {Number(date.split("-")[1])}월 {Number(date.split("-")[2])}일
            </Info>
            <Info>
                {Number(time.split(":")[0])}시
            </Info>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="#" width='40' height='40' />
            <Info>
                {Math.round((weather.main.temp - 273.15) * 10) / 10}&deg;C
            </Info> 
        </WeatherBox>
    )
}

const WeatherBox = styled.div`
    background-color: #A8AAC4;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    border-radius: 15px;
    margin: 0px 8px;
    padding: 4px 0px;
    box-shadow: 0px 44px 18px rgba(0, 69, 79, 0.01), 0px 25px 15px rgba(0, 69, 79, 0.05), 0px 11px 11px rgba(0, 69, 79, 0.09), 0px 3px 6px rgba(0, 69, 79, 0.1), 0px 0px 0px rgba(0, 69, 79, 0.1);
`
const Info = styled.div`
    font-size: 10px;
    font-weight: bold;
    color: #E8FCFF;
`