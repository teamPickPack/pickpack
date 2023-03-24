import WeatherList from './elements/WeatherList'
import OneWayTicket from './elements/OneWayTicket'
import RoundTicket from './elements/RoundTicket'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function List(){
    const data1 = {
        isLike: true,
        ticket: null,
        flightList: null,
    };
    const data2 = {
        isLike: false,
        goWay: {
            ticket: null,
            flightList: null,
        },
        returnWay: {
            ticket: null,
            flightList: null,
        },
        totalPrice: 0,
    };

    
    const compareList = useSelector((state)=>{
        return state.compare.compareList;
    });


    const [compareBoxVisible, setCompareBoxVisible] = useState(true);
    const [ticketListWidth, setTicketListWidth] = useState(compareBoxVisible? window.innerWidth - 320 : window.innerWidth)
    const checkWidth = () =>{
        setTicketListWidth(compareBoxVisible? window.innerWidth - 320 : window.innerWidth);
    }
    useEffect(() => {
        setTicketListWidth(compareBoxVisible? window.innerWidth - 320 : window.innerWidth);
    }, [compareBoxVisible])
    window.addEventListener("resize", checkWidth);
    
    return(
        <div>
            <div>
                <WeatherList />
            </div>
            <hr></hr>
            <div style={{display: 'flex'}}>
                {compareBoxVisible ? <div style={{width: '320px', height: '100vh', border: '1px solid black'}}>
                    <button type='button' onClick={() => setCompareBoxVisible((compareBoxVisible) => !compareBoxVisible)}>닫을거면 눌러라~</button>
                    {compareList.map((compareItem) => {
                        console.log(compareItem.element)
                        return(
                            <>
                                <li>
                                    <div>{compareItem.mode}</div>
                                    <div>{compareItem.flightId}</div>
                                </li>
                            </>
                        )
                    })}
                </div> : null}
                <TicketList ticketListWidth={ticketListWidth} style={{border: '1px solid gold', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <OneWayTicket isCheck={false} isLike={data1.isLike} ticket={data1.ticket} flightList={data1.flightList} />
                    <OneWayTicket isCheck={false} isLike={data1.isLike} ticket={data1.ticket} flightList={data1.flightList} />
                    <OneWayTicket isCheck={false} isLike={data1.isLike} ticket={data1.ticket} flightList={data1.flightList} />
                    <OneWayTicket isCheck={false} isLike={data1.isLike} ticket={data1.ticket} flightList={data1.flightList} />
                    <OneWayTicket isCheck={false} isLike={data1.isLike} ticket={data1.ticket} flightList={data1.flightList} />
                    <OneWayTicket isCheck={false} isLike={data1.isLike} ticket={data1.ticket} flightList={data1.flightList} />
                    <RoundTicket isCheck={false} isLike={data2.isLike} goWay={data2.goWay} returnWay={data2.returnWay} totalPrice={data2.totalPrice} />
                </TicketList>
            </div>
        </div>
    )
}

const TicketList = styled.div`
    width: ${(props) => props.ticketListWidth}px;
`