import WeatherList from './elements/WeatherList'
import TicketFront from './elements/TicketFront'

export default function List(){
    
    return(
        <>
            <div>
                <WeatherList />
            </div>
            <hr></hr>
            <div>
                <TicketFront/>
            </div>
        </>
    )
}