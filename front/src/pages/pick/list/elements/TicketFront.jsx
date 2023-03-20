// import {useState} from 'react'
import styled from "styled-components"
export default function TicketFront(){
    // const [airlineLogo, setAirLineLogo] = useState(null)
    
    const data = {
        "ticketList" : [
            {
                "isLike" : "T/F",
                "ticket" : {
                    "ticketId" : "티켓 고유 번호",
                    "waypointNum" : "경유지 수",
                    "price" : "가격",
                    "registDate" : "해당 티켓 크롤링 날짜",
                    "totalTime" : "총 소요시간",
                    "airline" : "항공사",
                    "codeshare" : "T/F 공동운항여부"
                },
                "flightList" : [
                    {
                        "departTime" : "출발 시간",
                        "departure" : "출발지",
                        "arriveTime" : "도착 시간",
                        "destination" : "도착지",
                        "waitTime" : "경유 대기 시간",
                        "flightTime" : "비행 시간",
                        "code" : "항공편명"
                    }
                ]
            }
        ]
    }
    return(
        <div id="ticket" style={{border: '1px solid black', width: '640px'}}>
            <div id="ticket-left" style={{width: '480px'}}>
                <div id="ticket-left-top" style={{border: '1px solid red', height: '64px', display: 'flex', alignItems: 'center', borderTopLeftRadius: '16px'}}>
                    <input type="checkbox" style={{width: '16px', height: '16px', margin: '0px 16px'}}/>
                    {/* {airlineLogo && <img src={airlineLogo} alt={<NoAirlineImage/>}/>} */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" style={{marginRight: '8px'}}>
                            <path fill="#fff" d="M19.7857 10.001383c0 5.404-4.383 9.785-9.786 9.785-5.406 0-9.786-4.381-9.786-9.785 0-5.405 4.38-9.786 9.786-9.786 5.403 0 9.786 4.381 9.786 9.786"/>
                            <path fill="#d52528" d="M14.2033 4.102483c2.981.919 5.147 3.694 5.147 6.976 0 .479-.046.947-.133 1.399l-.011.063c-.228 1.287-.75 2.474-1.495 3.486l-.014.016c1.309-1.665 2.089-3.765 2.089-6.045 0-5.408-4.384-9.792-9.792-9.792-2.463 0-4.713.911-6.435 2.412l-.021.02c-1.356 1.243-2.205 3.032-2.205 5.015 0 .823.146 1.611.412 2.341l.014.033c.68 1.494 2.184 2.53 3.932 2.53 2.385 0 4.32-1.932 4.32-4.317l-.013-1.858c0-.855.477-1.599 1.178-1.979l.007-.006c.55-.302 1.18-.474 1.85-.474.407 0 .798.062 1.166.18z"/>
                            <path fill="#233979" d="M5.797 15.897583c-2.981-.919-5.147-3.694-5.147-6.976 0-.479.046-.947.133-1.399l.011-.063c.228-1.287.75-2.474 1.495-3.486l.014-.016c-1.309 1.665-2.089 3.765-2.089 6.045 0 5.408 4.384 9.792 9.792 9.792 2.463 0 4.713-.911 6.435-2.412l.021-.02c1.356-1.243 2.205-3.032 2.205-5.015 0-.823-.146-1.611-.412-2.341l-.014-.033c-.68-1.494-2.184-2.53-3.932-2.53-2.385 0-4.32 1.932-4.32 4.317l.013 1.858c0 .855-.477 1.599-1.178 1.979l-.007.006c-.55.302-1.18.474-1.85.474-.407 0-.798-.062-1.166-.18z"/>
                        </svg>
                        <span style={{fontsize: '20px', fontWeight: 'bold'}}>대한항공</span>
                    </div>
                    <span style={{border: '1px solid black', fontSize: '8px', borderRadius: '16px', padding: '0px 4px', backgroundColor: '#D9D9D9', marginLeft: '16px'}}>공동</span>
                </div>
                <div id="ticket-left-middle" style={{border: '1px solid orange', height: '160px', display: 'flex', justifyContent: 'space-around'}}>
                    <div id="ticket-dep">
                        <div style={{fontSize: '16px', fontWeight: 'bold'}}>출발</div>
                        <div>
                            <div>인천</div>
                            <div>(ICN)</div>
                        </div>
                        <div>09:00</div>
                    </div>
                    <div id="ticket-stop" style={{border: '1px solid black', position: 'relative'}}>
                        <div style={{fontSize: '8px', padding: '2px 4px', borderBottom: '1px solid black'}}>프랑크푸르트(FRA)</div>
                        <div>
                            <div style={{position: 'absolute', top: '8px', right: '0px', borderTop: '2px solid gold', borderRight: '2px solid gold', width: '16px', height: '16px' , transform: 'rotate(45deg)'}}></div>
                        </div>
                        <div style={{fontSize: '8px', padding: '2px 4px', borderTop: '1px solid black'}}>33시간 30분</div>
                    </div>
                    <div id="ticket-arr">
                        <div style={{fontSize: '16px', fontWeight: 'bold'}}>출발</div>
                        <div>
                            <div>인천</div>
                            <div>(ICN)</div>
                        </div>
                        <div>09:00</div>
                    </div>
                </div>
                <div id="ticket-left-bottom"></div>
            </div>
            <div id="ticket-right">
                <div id="ticket-left-top"></div>
                <div id="ticket-left-middle"></div>
                <div id="ticket-left-bottom"></div>
            </div>
        </div>
    )
}


const NoAirlineImage = styled.div`
    width: 64px;
    height: 64px;
    background-color: black;
`