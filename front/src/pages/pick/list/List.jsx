import WeatherList from './elements/WeatherList'
import OneWayTicket from './elements/OneWayTicket'
import RoundTicket from './elements/RoundTicket'
import SearchTicket from '../main/elements/SearchTicket';
import mainBanner from '../../../assets/image/mainBanner.png';
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
    // let timer = null;
    // const checkWidth = () =>{ //너비가 새로 조정이 되었으면?
        // clearTimeout(timer);
        // timer = setTimeout(function(){
        //     setTicketListWidth(compareBoxVisible? window.innerWidth - 320 : window.innerWidth);
        // }, 100);
    // }
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
    useEffect(() => { //Box가 새로 생겨났으면?
        console.log(window.innerWidth);
        setTicketListWidth((ticketListWidth) => compareBoxVisible? window.innerWidth - 320 : ticketListWidth);
    }, [compareBoxVisible]);

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
            <FistSection>
                <SearchTicket />
            </FistSection>
            <Content flexStyle={compareBoxVisible}>
                {compareBoxVisible ? 
                <div style={{width: '320px', height: `${compareBoxHeight}px`, backgroundColor: '#e9e7ef', position: 'sticky', top: `${compareBoxTop}px`}}>
                    <CompareBoxBtnList>
                        <CompareBoxBtnItem color='#FCE2DB' width={120}>
                            <span>항공권 비교하기</span>
                        </CompareBoxBtnItem>
                        <CompareBoxBtnItem color='#FF0000' width={64} onClick={() => window.confirm('비교 목록을 초기화하시겠습니까?')? dispatch(compareAction.deleteCompareList()) : null}>
                            <span>초기화</span>
                        </CompareBoxBtnItem>
                    </CompareBoxBtnList>
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
                </div> : null}
                <TicketList ticketListWidth={ticketListWidth} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0px'}}>
                    <AdditionalInfo width={ticketListWidth}>
                        <WeatherList className="weather-list" />
                        <SearchInfo className="search-info" flexStyle={compareBoxVisible}>
                            <span style={{fontSize: '16px', fontWeight: '600', marginRight: '16px'}}>총 40,000개의 결과</span>
                            <div>
                                <label style={{fontSize: '16px', fontWeight: '600'}}>정렬 </label>
                                <select style={{fontSize: '16px', fontWeight: '600'}}>
                                    <option value="">금액낮은순</option>
                                    <option value="">변동폭큰순</option>
                                    <option value="">출발시간빠른순</option>
                                    <option value="">출발시간늦은순</option>
                                    <option value="">소요시간낮은순</option>
                                </select>
                            </div>
                        </SearchInfo>
                    </AdditionalInfo>
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
            </Content>
        </div>
    )
}

const FistSection = styled.div`
  text-align: center;
  height: 200px;
  background: url(${mainBanner});
  background-size: cover;
  padding: 48px 0;

  .search-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Content = styled.div`
    display: flex;
    justify-content: ${(props) => props.flexStyle ? 'space-between' : 'center'};
`
const TicketList = styled.div`
    width: ${(props) => props.ticketListWidth}px;
`;

const CompareItem = styled.div`
    transform: scale(${(props) => props.scale});
    transform-origin: top left;
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
    height: 24px;
    font-size: 12px;
    font-weight: bold;
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

const AdditionalInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width}px;
    margin-bottom: 12px;

    .weather-list{
        justify-content: flex-start;
    }
    .search-info{
        justify-content: flex-end;
    }
`;

const SearchInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
`