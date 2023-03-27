import WeatherList from './elements/WeatherList'
import OneWayTicket from './elements/OneWayTicket'
import RoundTicket from './elements/RoundTicket'

export default function List(){
    
    return(
        <>
            <div>
                <WeatherList />
            </div>
            <hr></hr>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <OneWayTicket/>
                <RoundTicket />
            </div>
        </>
    )
}