import { useState, useRef, useEffect } from 'react'
import styled from "styled-components"
import { MdOutlineChangeCircle } from "react-icons/md";
import FlightList from "./FlightList";
import LineChart from './LineChart';
import { useSelector, useDispatch } from 'react-redux';
import {airlineData} from '../data'
import { compareAction } from '../../../../store/compareSlice';
import { flight } from '../../../../apis/flight';
export default function OneWayTicket({
    fromCompare,
    isRound, 
    unifyCommon,
    handleLikeData,
    isCheck,
    isLike,
    ticket,
}){
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => {
        return state.user.accessToken;
    })
    const [ticketType, setTicketType] = useState(true); //앞면<->뒷면
    const [contentType, setContentType] = useState(true); //앞면 개요<->상세
    const [lineChartPrice, setLineChartPrice] = useState(null);
    const [check, setCheck] = useState(isCheck) //체크 여부
    const [like, setLike] = useState(isLike);
    useEffect(() => {
        setCheck(isCheck);
    }, [isCheck]);
    useEffect(() => {
        setLike(isLike);
    }, [isLike])
    useEffect(() => {
        for(let i = 0; i < airlineData.length; i++){
            if(airlineData[i].airline === ticket.airline){
                setTicketColor(airlineData[i].color);
                setTicketImg(airlineData[i].image);
                break;
            }
        }
    }, [ticket])
    const [changing, setChanging] = useState(false); //변화하는 애니메이션
    const [ticketColor, setTicketColor] = useState('gray'); //항공사 대표 색
    const [ticketImg, setTicketImg] = useState(null);
    const flightTicket = useRef(); // Ticket 컴포넌트
    const flightContent = useRef(); // FrontTicketLeftMiddle 컴포넌트
    
    const [priceData, setPriceData] = useState(null);
    useEffect(() => {
        const getTicketPrices = async (ticketId) => {
            const response = await flight.get.ticket(ticketId);
            // console.log(response);
            setPriceData(response);
        }
        getTicketPrices(ticket.id);
    }, [ticket])
    const changeTicketType = () => {
        if(fromCompare) return;
        if(changing) return;
        setChanging(true);
        flightTicket.current.style.animation = 'changeTicketType 1s linear';
        setTimeout(() => {
            setTicketType((ticketType) => !ticketType);
        }, 500);
    }
    const changeContentType = () => {
        if(changing) return;
        setChanging(true);
        flightContent.current.style.animation = 'changeContentType 1s linear';
        setTimeout(() => {
            setContentType((contentType) => !contentType)
        }, 500);
    }
    const deleteChangeAnimation = (ref) => { //애니메이션 해제
        setChanging(false);
        ref.current.style.animation = 'none'; 
    }
    
    const compareList = useSelector((state)=>{
        return state.compare.compareList;
    });
    const compareMode = useSelector((state) => {
        return state.compare.compareMode;
    });
    const handleCheck = () => {
        if(isRound){
            //RoundTicket으로 보내서 처리
            unifyCommon('check');
            return;
        }
        const payload = {
            mode: 'oneWay',
            isLike: like,
            flightId: ticket.id,
            flightData: {
                ticket,
            },
            priceData,
        }
        if(!check){  //Off->On일 때.. 1. 체크 켜기 2. store에 담기
            if(compareList.length !== 0 && compareMode !== 'oneWay'){
                alert('편도와 왕복을 동시에 비교할 수 없습니다.');
                return;
            }
            else if(compareList.length >= 3){
                alert('최대 3개의 항공권을 비교할 수 있습니다.');
                return;
            }
            setCheck(true);
            dispatch(compareAction.addCompareItem(payload));
        } 
        else{ //On->Off일 때..
            //너 비교에서 클릭 돼었으면.. 1. 세션 스토리지에서 해당 flightId인 놈 지워 2. 현재 List 내 Data에 같은 FlightId인 놈 있는지 보고 check 해제해야 해
            //너 데이터에 있던 놈이면.. 1. 그냥 checkOff하고 2. 세션 스토리지에서 지워
            setCheck(false);
            dispatch(compareAction.deleteCompareItem(payload));
        }
    }
    const handleLike = async () => {
        if(accessToken === null) {
            alert('로그인이 필요한 기능입니다.');
            return;
        }
        if(isRound){
            unifyCommon('like');
            return;
        }
        const payload = {
            mode: 'oneWay',
            isLike: !like, //목표값
            flightId: ticket.id,
            flightData: {
                ticket,
            },
            priceData
        }
        //비교 목록에서 눌렸다면? => 세션 스토리지 바꾸고 data에도 바뀐 값 적용해줘야 함
        //아닌데, check에도 있는 값이면? => 세션 스토리지 바꾸고 data에도 바꾸고
        //check에 없는 값이면 => data만 바꾸고
        if(like) {
            try{
                const response = await flight.put.likeOne({ticketId: ticket.id});
                // console.log('해제 '+response);
                alert('알림이 해제되었습니다.');
                if(check){
                    //idx번째 data의 isLike를 바꿔라
                    handleLikeData(payload.flightId, !like);
                    dispatch(compareAction.updateCompareItem(payload));
                }
                else{
                    handleLikeData(payload.flightId, !like);
                    setLike((like) => !like);
                }
            } catch(err) {
                console.log(err);
            }
            //찜 취소
        }
        else {
            //찜 하기
            try{
                const response = await flight.post.likeOne({ticketId: ticket.id});
                // console.log('등록 '+response);
                alert('알림이 등록되었습니다.');
                if(check){
                    //idx번째 data의 isLike를 바꿔라
                    handleLikeData(payload.flightId, !like);
                    dispatch(compareAction.updateCompareItem(payload));
                    setLike((like) => !like);
                }
                else{
                    handleLikeData(payload.flightId, !like);
                    setLike((like) => !like);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    return(
        <Ticket isRound={isRound} ref={flightTicket} onAnimationEnd={() => deleteChangeAnimation(flightTicket)}>
            <TicketBackground className="ticket-background" />
            { ticketType ? 
            <>
            <TicketLeft>
                <TicketLeftTop color={ticketColor}>
                    <TicketLeftTopCheck type="checkbox" checked={check} onChange={handleCheck}/>
                    <TicketLeftTopAirLine>
                        <img src={ticketImg} alt='#' width='32' height='32' style={{border: '1px solid black', backgroundColor: 'white', borderRadius: '50%'}}/>
                        <span style={{marginLeft: '8px', color: 'white'}}>{ticket.airline}</span>
                    </TicketLeftTopAirLine>
                    {ticket.codeshare && <TicketLeftTopCodeShare>공동</TicketLeftTopCodeShare>}
                </TicketLeftTop>
                <FrontTicketLeftMiddle ref={flightContent} onAnimationEnd={() => deleteChangeAnimation(flightContent)}>
                    {!contentType ? <FlightList data={ticket.flightList} /> : 
                    <>
                        <FrontTicketLeftMiddlePoint>
                            <div className="point-type">출발</div>
                            <div className="point-content">
                                <div className="point-city">{ticket.depName}</div>
                                <div className="point-code">({ticket.depCode})</div>
                            </div>
                            <div className="point-time">{ticket.depTime}</div>
                        </FrontTicketLeftMiddlePoint>
                        <FrontTicketLeftMiddleArrow>
                            <div className="arrow-stopover">{ticket.waypoints === "" ? '직항' : ticket.waypoints}</div>
                            <div className="arrow-line"/>
                            <div className="arrow-time">{ticket.totalTime}</div>
                        </FrontTicketLeftMiddleArrow>
                        <FrontTicketLeftMiddlePoint>
                            <div className="point-type">도착</div>
                            <div className="point-content" >
                                <div className="point-city">{ticket.arrName}</div>
                                <div className="point-code">({ticket.arrCode})</div>
                            </div>
                            <div className="point-time">{ticket.arrTime} {ticket.plusDate > 0 ? `+ ${ticket.plusDate}`: null}</div>
                        </FrontTicketLeftMiddlePoint>
                    </>
                    }
                    <MdOutlineChangeCircle className="change-button" onClick={changeContentType} size={24}/>
                </FrontTicketLeftMiddle>
                <FrontTicketLeftBottom color={ticketColor}/>
            </TicketLeft>
            <TicketMiddleBorder />
            <TicketRight>
                <TicketRightTop color={ticketColor}>
                    <svg onClick={handleLike} className="bell" width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_197_7036" fill={like? 'gold' : 'white'}>
                            <ellipse cx="13.9163" cy="2.78552" rx="2.51497" ry="2.78259"/>
                        </mask>
                        <ellipse cx="13.9163" cy="2.78552" rx="2.51497" ry="2.78259" fill={like? 'gold' : 'white'}/>
                        <path d="M13.4313 2.78552C13.4313 2.82058 13.4191 2.79677 13.469 2.74152C13.5234 2.68136 13.678 2.56812 13.9163 2.56812V8.56812C17.2404 8.56812 19.4313 5.68655 19.4313 2.78552H13.4313ZM13.9163 2.56812C14.1547 2.56812 14.3093 2.68136 14.3636 2.74152C14.4136 2.79677 14.4014 2.82058 14.4014 2.78552H8.40137C8.40137 5.68655 10.5923 8.56812 13.9163 8.56812V2.56812ZM14.4014 2.78552C14.4014 2.75046 14.4136 2.77427 14.3636 2.82952C14.3093 2.88969 14.1547 3.00293 13.9163 3.00293V-2.99707C10.5923 -2.99707 8.40137 -0.1155 8.40137 2.78552H14.4014ZM13.9163 3.00293C13.678 3.00293 13.5234 2.88969 13.469 2.82952C13.4191 2.77427 13.4313 2.75046 13.4313 2.78552H19.4313C19.4313 -0.1155 17.2404 -2.99707 13.9163 -2.99707V3.00293Z" fill="#010444" mask="url(#path-1-inside-1_197_7036)"/>
                        <path d="M18.2844 27.8292C18.2844 28.3687 17.9793 29.0012 17.1962 29.5582C16.4163 30.1129 15.2614 30.5031 13.9161 30.5031C12.5708 30.5031 11.4159 30.1129 10.636 29.5582C9.85291 29.0012 9.54785 28.3687 9.54785 27.8292C9.54785 27.2896 9.85291 26.6571 10.636 26.1001C11.4159 25.5454 12.5708 25.1553 13.9161 25.1553C15.2614 25.1553 16.4163 25.5454 17.1962 26.1001C17.9793 26.6571 18.2844 27.2896 18.2844 27.8292Z" fill={like? 'gold' : 'white'} stroke="#010444" strokeWidth="3"/>
                        <mask id="path-4-inside-2_197_7036" fill={like? 'gold' : 'white'}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.084 2.64746C7.85974 2.64746 2.61127 7.28598 1.8462 13.463L1.80483 13.797C1.64912 15.0542 1.68697 16.2862 1.89371 17.4652H1.50898L0 27.8303H28L26.6587 17.4652H26.2743C26.481 16.2862 26.5188 15.0542 26.3631 13.797L26.3218 13.463C25.5567 7.28597 20.3082 2.64746 14.084 2.64746Z"/>
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.084 2.64746C7.85974 2.64746 2.61127 7.28598 1.8462 13.463L1.80483 13.797C1.64912 15.0542 1.68697 16.2862 1.89371 17.4652H1.50898L0 27.8303H28L26.6587 17.4652H26.2743C26.481 16.2862 26.5188 15.0542 26.3631 13.797L26.3218 13.463C25.5567 7.28597 20.3082 2.64746 14.084 2.64746Z" fill={like? 'gold' : 'white'}/>
                        <path d="M1.8462 13.463L-1.13105 13.0943L-1.13105 13.0943L1.8462 13.463ZM1.80483 13.797L4.78209 14.1657L4.78209 14.1657L1.80483 13.797ZM1.89371 17.4652V20.4652H5.46556L4.84862 16.947L1.89371 17.4652ZM1.50898 17.4652V14.4652H-1.0859L-1.45972 17.033L1.50898 17.4652ZM0 27.8303L-2.96871 27.3981L-3.46837 30.8303H0V27.8303ZM28 27.8303V30.8303H31.4132L30.9752 27.4453L28 27.8303ZM26.6587 17.4652L29.6339 17.0802L29.2955 14.4652H26.6587V17.4652ZM26.2743 17.4652L23.3193 16.947L22.7024 20.4652H26.2743V17.4652ZM26.3631 13.797L23.3859 14.1657L23.3859 14.1657L26.3631 13.797ZM26.3218 13.463L29.299 13.0943L29.299 13.0943L26.3218 13.463ZM4.82345 13.8318C5.40239 9.1575 9.37399 5.64746 14.084 5.64746V-0.352539C6.34548 -0.352539 -0.179854 5.41445 -1.13105 13.0943L4.82345 13.8318ZM4.78209 14.1657L4.82345 13.8318L-1.13105 13.0943L-1.17242 13.4282L4.78209 14.1657ZM4.84862 16.947C4.69277 16.0582 4.66326 15.1251 4.78209 14.1657L-1.17242 13.4282C-1.36501 14.9832 -1.31883 16.5142 -1.0612 17.9833L4.84862 16.947ZM1.50898 20.4652H1.89371V14.4652H1.50898V20.4652ZM2.96871 28.2625L4.47769 17.8974L-1.45972 17.033L-2.96871 27.3981L2.96871 28.2625ZM28 24.8303H0V30.8303H28V24.8303ZM23.6835 17.8502L25.0248 28.2153L30.9752 27.4453L29.6339 17.0802L23.6835 17.8502ZM26.2743 20.4652H26.6587V14.4652H26.2743V20.4652ZM23.3859 14.1657C23.5047 15.1251 23.4752 16.0582 23.3193 16.947L29.2292 17.9833C29.4868 16.5142 29.533 14.9832 29.3404 13.4282L23.3859 14.1657ZM23.3445 13.8318L23.3859 14.1657L29.3404 13.4282L29.299 13.0943L23.3445 13.8318ZM14.084 5.64746C18.794 5.64746 22.7656 9.1575 23.3445 13.8318L29.299 13.0943C28.3478 5.41444 21.8225 -0.352539 14.084 -0.352539V5.64746Z" fill="#010444" mask="url(#path-4-inside-2_197_7036)"/>
                    </svg>
                </TicketRightTop>
                <div id="ticket-right-middle" style={{height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
                    <div style={{fontSize: '20px', margin: 'auto 0px', fontWeight: '600'}}>{ticket.price.toLocaleString('ko-kr')}원</div>
                </div>
                <TicketRightBottom color={ticketColor}>
                    <div className="flip-background"></div>
                    <FlipPaper className="flip" onClick={changeTicketType}/>
                </TicketRightBottom>
            </TicketRight>
            </> : 
            <>
                <TicketLeft>
                    <TicketLeftTop color={ticketColor}>
                        <TicketLeftTopCheck type="checkbox" checked={isCheck} onChange={handleCheck}/>
                        <TicketLeftTopAirLine>
                            <img src={ticketImg} alt='#' width='32' height='32' style={{border: '1px solid black', backgroundColor: 'white', borderRadius: '50%'}}/>
                            <span style={{marginLeft: '8px', color: 'white'}}>{ticket.airline}</span>
                        </TicketLeftTopAirLine>
                        {ticket.codeshare && <TicketLeftTopCodeShare>공동</TicketLeftTopCodeShare>}
                    </TicketLeftTop>
                    <BackTicketLeftMiddle id="ticket-left-middle" ref={flightContent} onAnimationEnd={deleteChangeAnimation}>
                        {priceData !== "no Info" ? <LineChart setLineChartPrice={setLineChartPrice} priceData={priceData}/> : <div>항공권 가격 추이가 준비되지 않았습니다.</div>}
                    </BackTicketLeftMiddle>
                </TicketLeft>
                <TicketMiddleBorder/>
                <TicketRight>
                    <TicketRightTop color={ticketColor}>
                        <svg onClick={handleLike} className="bell" width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_197_7036" fill={like? 'gold' : 'white'}>
                                <ellipse cx="13.9163" cy="2.78552" rx="2.51497" ry="2.78259"/>
                            </mask>
                            <ellipse cx="13.9163" cy="2.78552" rx="2.51497" ry="2.78259" fill={like? 'gold' : 'white'}/>
                            <path d="M13.4313 2.78552C13.4313 2.82058 13.4191 2.79677 13.469 2.74152C13.5234 2.68136 13.678 2.56812 13.9163 2.56812V8.56812C17.2404 8.56812 19.4313 5.68655 19.4313 2.78552H13.4313ZM13.9163 2.56812C14.1547 2.56812 14.3093 2.68136 14.3636 2.74152C14.4136 2.79677 14.4014 2.82058 14.4014 2.78552H8.40137C8.40137 5.68655 10.5923 8.56812 13.9163 8.56812V2.56812ZM14.4014 2.78552C14.4014 2.75046 14.4136 2.77427 14.3636 2.82952C14.3093 2.88969 14.1547 3.00293 13.9163 3.00293V-2.99707C10.5923 -2.99707 8.40137 -0.1155 8.40137 2.78552H14.4014ZM13.9163 3.00293C13.678 3.00293 13.5234 2.88969 13.469 2.82952C13.4191 2.77427 13.4313 2.75046 13.4313 2.78552H19.4313C19.4313 -0.1155 17.2404 -2.99707 13.9163 -2.99707V3.00293Z" fill="#010444" mask="url(#path-1-inside-1_197_7036)"/>
                            <path d="M18.2844 27.8292C18.2844 28.3687 17.9793 29.0012 17.1962 29.5582C16.4163 30.1129 15.2614 30.5031 13.9161 30.5031C12.5708 30.5031 11.4159 30.1129 10.636 29.5582C9.85291 29.0012 9.54785 28.3687 9.54785 27.8292C9.54785 27.2896 9.85291 26.6571 10.636 26.1001C11.4159 25.5454 12.5708 25.1553 13.9161 25.1553C15.2614 25.1553 16.4163 25.5454 17.1962 26.1001C17.9793 26.6571 18.2844 27.2896 18.2844 27.8292Z" fill={like? 'gold' : 'white'} stroke="#010444" strokeWidth="3"/>
                            <mask id="path-4-inside-2_197_7036" fill={like? 'gold' : 'white'}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.084 2.64746C7.85974 2.64746 2.61127 7.28598 1.8462 13.463L1.80483 13.797C1.64912 15.0542 1.68697 16.2862 1.89371 17.4652H1.50898L0 27.8303H28L26.6587 17.4652H26.2743C26.481 16.2862 26.5188 15.0542 26.3631 13.797L26.3218 13.463C25.5567 7.28597 20.3082 2.64746 14.084 2.64746Z"/>
                            </mask>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.084 2.64746C7.85974 2.64746 2.61127 7.28598 1.8462 13.463L1.80483 13.797C1.64912 15.0542 1.68697 16.2862 1.89371 17.4652H1.50898L0 27.8303H28L26.6587 17.4652H26.2743C26.481 16.2862 26.5188 15.0542 26.3631 13.797L26.3218 13.463C25.5567 7.28597 20.3082 2.64746 14.084 2.64746Z" fill={like? 'gold' : 'white'}/>
                            <path d="M1.8462 13.463L-1.13105 13.0943L-1.13105 13.0943L1.8462 13.463ZM1.80483 13.797L4.78209 14.1657L4.78209 14.1657L1.80483 13.797ZM1.89371 17.4652V20.4652H5.46556L4.84862 16.947L1.89371 17.4652ZM1.50898 17.4652V14.4652H-1.0859L-1.45972 17.033L1.50898 17.4652ZM0 27.8303L-2.96871 27.3981L-3.46837 30.8303H0V27.8303ZM28 27.8303V30.8303H31.4132L30.9752 27.4453L28 27.8303ZM26.6587 17.4652L29.6339 17.0802L29.2955 14.4652H26.6587V17.4652ZM26.2743 17.4652L23.3193 16.947L22.7024 20.4652H26.2743V17.4652ZM26.3631 13.797L23.3859 14.1657L23.3859 14.1657L26.3631 13.797ZM26.3218 13.463L29.299 13.0943L29.299 13.0943L26.3218 13.463ZM4.82345 13.8318C5.40239 9.1575 9.37399 5.64746 14.084 5.64746V-0.352539C6.34548 -0.352539 -0.179854 5.41445 -1.13105 13.0943L4.82345 13.8318ZM4.78209 14.1657L4.82345 13.8318L-1.13105 13.0943L-1.17242 13.4282L4.78209 14.1657ZM4.84862 16.947C4.69277 16.0582 4.66326 15.1251 4.78209 14.1657L-1.17242 13.4282C-1.36501 14.9832 -1.31883 16.5142 -1.0612 17.9833L4.84862 16.947ZM1.50898 20.4652H1.89371V14.4652H1.50898V20.4652ZM2.96871 28.2625L4.47769 17.8974L-1.45972 17.033L-2.96871 27.3981L2.96871 28.2625ZM28 24.8303H0V30.8303H28V24.8303ZM23.6835 17.8502L25.0248 28.2153L30.9752 27.4453L29.6339 17.0802L23.6835 17.8502ZM26.2743 20.4652H26.6587V14.4652H26.2743V20.4652ZM23.3859 14.1657C23.5047 15.1251 23.4752 16.0582 23.3193 16.947L29.2292 17.9833C29.4868 16.5142 29.533 14.9832 29.3404 13.4282L23.3859 14.1657ZM23.3445 13.8318L23.3859 14.1657L29.3404 13.4282L29.299 13.0943L23.3445 13.8318ZM14.084 5.64746C18.794 5.64746 22.7656 9.1575 23.3445 13.8318L29.299 13.0943C28.3478 5.41444 21.8225 -0.352539 14.084 -0.352539V5.64746Z" fill="#010444" mask="url(#path-4-inside-2_197_7036)"/>
                        </svg>
                    </TicketRightTop>
                    {priceData !== "no Info" ? <BackTicketRightMiddle>
                        <div className="right-analysis">
                            <div style={{border: '1px solid black'}}>현재가</div>
                            <div>{priceData.info[priceData.info.length - 1].price.toLocaleString('ko-kr')}원</div>
                        </div>
                        <div className="right-analysis">
                            <div style={{border: '1px solid black'}}>평균 대비</div>
                            {priceData.chg < 0 ? <div>{Math.round(Math.abs(priceData.chg) * 100) / 100}% 하락</div> : <div>{Math.round(priceData.chg * 100) / 100}% 상승</div>}
                        </div>
                        <div className="right-analysis">
                            <div style={{border: '1px solid black'}}>선택일 대비</div>
                            {lineChartPrice === null ? <div>그래프에 마우스를 올리세요.</div> : <div>{priceData.info[priceData.info.length - 1].price - lineChartPrice >= 0 ? `${Math.round((priceData.info[priceData.info.length - 1].price - lineChartPrice) / lineChartPrice * 10000) / 100}% 상승` : `${Math.round(Math.abs((priceData.info[priceData.info.length - 1].price - lineChartPrice)) / lineChartPrice * 10000) / 100}% 하락`}</div>}
                        </div>
                        <div className="right-analysis">
                            {priceData.updown < 0 ? <div style={{border: '1px solid black'}}>{Math.abs(priceData.updown)}일 간 하락세</div> : <div style={{border: '1px solid black'}}>{Math.abs(priceData.updown)}일 간 상승세</div>}
                        </div>
                    </BackTicketRightMiddle> : <div style={{height: '160px'}}></div>}
                    <TicketRightBottom color='white'>
                        <div className="flip-background"></div>
                        <FlipPaper className="flip" onClick={changeTicketType}/>
                    </TicketRightBottom>
                </TicketRight>
            </>}  
        </Ticket>
    )
}

const Ticket = styled.div`
    width: 640px;
    display: flex;
    border: 1px solid black;
    border-radius: 16px;
    position: relative;
    margin: ${(props) => !props.isRound? '8' : '0'}px 0px;
    @keyframes changeTicketType{
        0%{
            transform: rotateY(0deg);
        }
        50%{
            transform: rotateY(90deg);
        }
        100%{
            transform: rotateY(0deg);
        }
    }

    &:hover .flip{
        animation: readyToFlip 1s infinite linear;
    }
    @keyframes readyToFlip{
        0%{
            transform: rotateX(0deg) rotateY(0deg) skewX(0deg);
            cursor: pointer;
        }
        50%{
            transform: rotateX(-45deg) rotateY(23deg) skewX(-6deg);
            cursor: pointer;
        }
        100%{
            transform: rotateX(0deg) rotateY(0deg) skewX(0deg);
            cursor: pointer;
        }
    }
`
const TicketLeft = styled.div`
    width: 480px;
`;
const TicketLeftTop = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    border-top-left-radius: 16px;
    background-color: ${props => props.color || 'white'};
`;
const TicketLeftTopCheck = styled.input`
    width: 16px;
    height: 16px;
    margin: 0px 16px;
`;
const TicketLeftTopAirLine = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-right: 8px;
    }
    span {
        font-size: 16px;
        font-weight: bold;
    }
`;
const TicketLeftTopCodeShare = styled.span`
    border: 1px solid black;
    font-size: 8px;
    border-radius: 16px;
    padding: 0px 4px;
    background-color: #D9D9D9;
    margin-left: 8px;
`;
const FrontTicketLeftMiddle = styled.div`
    height: 160px;
    width: 480px;
    background-color: white;
    display: flex;
    justify-content: space-around;
    position: relative;
    @keyframes changeContentType{
        0%{
            transform: rotateX(0deg);
        }
        50%{
            transform: rotateX(90deg);
        }
        100%{
            transform: rotateX(0deg);
        }
    }
    .change-button{
        position: absolute;
        top: 8px;
        right: 8px;
    }
    .change-button:hover{
        cursor: pointer;
        opacity: .7;
    }
`;
const TicketMiddleBorder = styled.div`
    border-left: 2px dashed black;
`;
const BackTicketLeftMiddle = styled.div`
    height: 192px;
    border-bottom-left-radius: 16px;
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
`;
const BackTicketRightMiddle = styled.div`
    height: 160px;
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: space-between;

    .right-analysis{
        font-size: 10px;
        margin: auto 0px;
        font-weight: bold;
        text-align: center;
    }
`

const FrontTicketLeftBottom = styled.div`
    height: 32px;
    border-bottom-left-radius: 16px;
    background-color: ${(props) => props.color};
`
const FrontTicketLeftMiddlePoint = styled.div`
    text-align: center;
    margin: auto 0px;

    .point-type{
        fontSize: 16px;
        font-weight: bold;
    }
    .point-content{
        margin: 8px 0px;
    }
    .point-city{
        font-size: 24px;
        font-weight: bold;
    }
    .point-code, point-time{
        font-size: 16px;
    }

`;
const FrontTicketLeftMiddleArrow = styled.div`
    position: relative;
    text-align: center;
    margin: auto 0px;

    .arrow-stopover{
        font-size: 8px;
        padding: 4px 16px;
        border-bottom: 1px solid black;
    }
    .arrow-line{
        position: absolute;
        top: 17.5px;
        right: 1px;
        border-top: 2px solid black;
        border-right: 2px solid black;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
    }
    .arrow-time{
        font-size: 8px;
        padding: 4px 16px;
        border-top: 1px solid black;
    }
`
const TicketRight = styled.div`
    width: 160px;
`
const TicketRightTop = styled.div`
    height: 48px;
    border-top-right-radius: 16px;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .bell{
        margin-right: 16px;
    }
    .bell:hover {
        color: red;
        cursor: pointer;
        opacity: 0.2;
    }
`;
const TicketRightBottom = styled.div`
    height: 32px;
    position: relative;
    background-color: ${(props) => props.color};
    .flip-background{
        position: absolute;
        right: -2px;
        bottom: -2px;
        width: 0px;
        height: 0px;
        border-bottom: 22px solid white;
        border-top: 22px solid transparent;
        border-left: 22px solid transparent;
        border-right: 22px solid white;
    }

    &:hover .flip{
        animation: getGradient 1s infinite linear;
    }
    @keyframes getGradient{
        0%{
            transform: rotateX(0deg) rotateY(0deg) skewX(0deg);
            cursor: pointer;            
            background: linear-gradient(to bottom right, rgba(255,255,255,1) 50%, rgba(125,125,125,0.2) 51%, rgba(125,125,125,0.04) 75%, rgb(255,255,255) 25%);
        }
        50%{
            transform: rotateX(-45deg) rotateY(23deg) skewX(-6deg);
            background: linear-gradient(to bottom right, rgba(255,255,255,1) 50%, rgba(125,125,125,0.5) 51%, rgba(125,125,125,0.1) 75%, rgb(255,255,255) 25%);

        }
        100%{
            transform: rotateX(0deg) rotateY(0deg) skewX(0deg);
            background: linear-gradient(to bottom right, rgba(255,255,255,1) 50%, rgba(125,125,125,0.2) 51%, rgba(125,125,125,0.04) 75%, rgb(255,255,255) 25%);
        }
    }
    
`;
const FlipPaper = styled.div`
    position: absolute;
    right: -1px;
    bottom: -1px;
    border-top-left-radius: 16px;
    width: 40px;
    height: 40px;
    background: white;
    box-shadow: -3px -3px 3px rgba(0, 0, 0, 0.5);
`;

const TicketBackground = styled.div`
    position: absolute;
    width: 640px;
    height: 240px;
    top: 0px;
    left: 0px;
    border-radius: 16px;
    background-color: white;
    z-index: -1;
`;