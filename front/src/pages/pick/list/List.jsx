import WeatherList from './elements/WeatherList'
import OneWayTicket from './elements/OneWayTicket'
import RoundTicket from './elements/RoundTicket'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compareAction } from '../../../store/compareSlice';
import garudaIndonesia from '../../../assets/airlines/가루다인도네시아항공.png';
import gilsang from '../../../assets/airlines/가루다인도네시아항공.png';
import korean from '../../../assets/airlines/대한항공.png';
import delta from '../../../assets/airlines/델타항공.png';
import styled from 'styled-components';

export default function List(){
    const airlineData = [
        {
            airline: '가루다인도네시아항공',
            color: 'rgb(19,150,168)',
            image: garudaIndonesia,
        },
        {
            airline: '길상항공',
            color: 'rgb(176,54,66)',
            image: gilsang,
        },
        {
            airline: '대한항공',
            color: 'rgb(181,237,254)',
            image: korean,
        },
        {
            airline: '델타항공',
            color: 'rgb(255,255,255)',
            image: delta,
        }
    ]
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(data2);
    }, []);
    const data1 = [
        {
            isLike: true,
            isCheck: null,
            ticket: {
                ticketId: 1,
            },
            flightList: null,
        },
        {
            isLike: false,
            isCheck: null,
            ticket: {
                ticketId: 2,
            },
            flightList: null,
        },
        
        {
            isLike: false,
            isCheck: null,
            ticket: {
                ticketId: 3,
            },
            flightList: null,
        },
        
        {
            isLike: false,
            isCheck: null,
            ticket: {
                ticketId: 4,
            },
            flightList: null,
        },
        
        {
            isLike: false,
            isCheck: null,
            ticket: {
                ticketId: 5,
            },
            flightList: null,
        },
        
        {
            isLike: false,
            isCheck: null,
            ticket: {
                ticketId: 6,
            },
            flightList: null,
        }
    ];
    const data2 = [
        {
            isLike: false,
            isCheck: null,
            goWay: {
                ticket: {
                    ticketId: 1,
                },
                flightList: null,
            },
            returnWay: {
                ticket: {
                    ticketId: 3,
                },
                flightList: null,
            },
            totalPrice: 0,
        },
        {
            isLike: true,
            isCheck: null,
            goWay: {
                ticket: {
                    ticketId: 1,
                },
                flightList: null,
            },
            returnWay: {
                ticket: {
                    ticketId: 4,
                },
                flightList: null,
            },
            totalPrice: 0,
        },
        {
            isLike: true,
            isCheck: null,
            goWay: {
                ticket: {
                    ticketId: 2,
                },
                flightList: null,
            },
            returnWay: {
                ticket: {
                    ticketId: 3,
                },
                flightList: null,
            },
            totalPrice: 0,
        },
        {
            isLike: false,
            isCheck: null,
            goWay: {
                ticket: {
                    ticketId: 2,
                },
                flightList: null,
            },
            returnWay: {
                ticket: {
                    ticketId: 4,
                },
                flightList: null,
            },
            totalPrice: 0,
        },
        {
            isLike: false,
            isCheck: null,
            goWay: {
                ticket: {
                    ticketId: 20,
                },
                flightList: null,
            },
            returnWay: {
                ticket: {
                    ticketId: 40,
                },
                flightList: null,
            },
            totalPrice: 0,
        },
    ];
    const dispatch = useDispatch();
    const compareList = useSelector((state)=>{
        return state.compare.compareList;
    });
    const compareMode = useSelector((state) => {
        return state.compare.compareMode;
    });
    const handleLikeData = (ticketId, value) => {
        if(compareMode === 'oneWay'){
            for(let i = 0; i < data.length; i++){
                if(data[i].ticket.ticketId === ticketId){
                    data[i].isLike = value;
                    break;
                }
            }
        }
        else{
            for(let i = 0; i < data.length; i++){
                if(`${data[i].goWay.ticket.ticketId}-${data[i].returnWay.ticket.ticketId}` === ticketId){
                    data[i].isLike = value;
                    break;
                }
            }
        }
    }
    useEffect(() => {
        if(compareList.length > 0) setCompareBoxVisible(true);
        else setCompareBoxVisible(false);
    }, [compareList])
    const [compareBoxVisible, setCompareBoxVisible] = useState(compareList.length > 0 ? true : false);
    const [ticketListWidth, setTicketListWidth] = useState(compareBoxVisible? window.innerWidth - 320 : window.innerWidth)
    const checkWidth = () =>{
        setTicketListWidth(compareBoxVisible? window.innerWidth - 320 : window.innerWidth);
    }
    const initialCheck = (mode, ticketId) => { //체크에 관련해서...
        let result = false;
        if(mode !== compareMode) return result;
        for(let i = 0; i < compareList.length; i++){
            if(compareList[i].flightId === ticketId){
                result = true;
                break;
            }
        }
        return result;
    }
    useEffect(() => {
        setTicketListWidth(compareBoxVisible? window.innerWidth - 320 : window.innerWidth);
    }, [compareBoxVisible]);
    window.addEventListener("resize", checkWidth);
    const [compareBoxTop, setCompareBoxTop] = useState(160);
    const [compareBoxHeight, setCompareBoxHeight] = useState(window.innerHeight-160);
    const checkHeight = () => {
        if(window.scrollY > 160){
            setCompareBoxTop(0);
            setCompareBoxHeight(window.innerHeight);
        }else{
            setCompareBoxTop(160-window.scrollY);
            setCompareBoxHeight(window.innerHeight - compareBoxTop);
        }
    }
    window.addEventListener("scroll", checkHeight);
    return(
        <div>
            <div>
                <WeatherList />
                <WeatherList />
                <WeatherList />
            </div>
            <hr></hr>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {compareBoxVisible ? 
                <div style={{width: '320px', height: `${compareBoxHeight}px`, backgroundColor: '#e9e7ef', position: 'sticky', top: `${compareBoxTop}px`}}>
                    {compareList.map((compareItem) => {
                        return(
                            <div key={compareItem.flightId}>
                                {compareItem.mode === 'oneWay'? 
                                    <CompareItem scale={0.5}>
                                        <OneWayTicket className="compare-oneWay" fromCompare={true} isRound={false} handleLikeData={handleLikeData} isCheck={true} isLike={compareItem.isLike}
                                        ticket={compareItem.flightData.ticket} flightList={compareItem.flightData.flightList} />
                                    </CompareItem> :
                                    <CompareItem scale={0.4}>
                                        <RoundTicket className="compare-round" fromCompare={true} handleLikeData={handleLikeData} isCheck={true} isLike={compareItem.isLike} goWay={compareItem.flightData[0]} returnWay={compareItem.flightData[1]} />
                                    </CompareItem>
                                }
                            </div>
                        )
                    })}
                    <CompareBoxBtnList>
                        <CompareBoxBtnItem color='#FCE2DB' width={160}>
                            <span>항공권 비교하기</span>
                        </CompareBoxBtnItem>
                        <CompareBoxBtnItem color='#FF0000' width={80} onClick={() => window.confirm('비교 목록을 초기화하시겠습니까?')? dispatch(compareAction.deleteCompareList()) : null}>
                            <span>초기화</span>
                        </CompareBoxBtnItem>
                    </CompareBoxBtnList>
                </div> : null}
                <TicketList ticketListWidth={ticketListWidth} style={{border: '1px solid gold', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {/* {data && data.map((one) => {
                        one.isCheck = initialCheck('oneWay', one.ticket.ticketId);
                        return(
                            <OneWayTicket key={one.ticket.ticketId} fromCompare={false} isRound={false} handleLikeData={handleLikeData} 
                            isCheck={one.isCheck} isLike={one.isLike} ticket={one.ticket} flightList={one.flightList} />
                        )
                    })} */}
                    {data && data.map((one) => {
                        one.isCheck = initialCheck('round', `${one.goWay.ticket.ticketId}-${one.returnWay.ticket.ticketId}`)
                        return(
                            <RoundTicket key={`${one.goWay.ticket.ticketId}-${one.returnWay.ticket.ticketId}`} fromCompare={false} handleLikeData={handleLikeData}
                            isCheck={one.isCheck} isLike={one.isLike} goWay={one.goWay} returnWay={one.returnWay} totalPrice={one.totalPrice} />
                        )
                    })}
                    {/* <RoundTicket isCheck={false} isLike={data2.isLike} goWay={data2.goWay} returnWay={data2.returnWay} totalPrice={data2.totalPrice} /> */}
                </TicketList>
            </div>
        </div>
    )
}

const TicketList = styled.div`
    width: ${(props) => props.ticketListWidth}px;
`;

const CompareItem = styled.div`
    transform: scale(${(props) => props.scale});
    transform-origin: top left;
    margin: 8px 0px;
    height: 128px;

    .compare-oneWay {
        height: 120px;
    }

    .compare-round {
        height: 128px;
        background-color: red;
    }
`

const CompareBoxBtnList = styled.div`
    display: flex;
    justify-content: space-around;
    width: 320px;
    padding: 16px 0px;
`
const CompareBoxBtnItem = styled.div`
    border-radius: 8px;
    width: ${(props) => props.width}px;
    background-color: ${(props) => props.color};
    height: 32px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(2) {
        color: white;
    }
    &:hover{
        opacity: .7;
        cursor: pointer;
    }
`