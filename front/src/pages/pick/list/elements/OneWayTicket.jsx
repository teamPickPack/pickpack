import { useState, useRef, useEffect } from 'react'
import styled from "styled-components"
import { MdOutlineChangeCircle } from "react-icons/md";
import FlightList from "./FlightList";
import LineChart from './LineChart';
import { useSelector, useDispatch } from 'react-redux';
import { compareAction } from '../../../../store/compareSlice';
import garudaIndonesia from '../../../../assets/airlines/대한항공.png';
export default function OneWayTicket({
    fromCompare,
    isRound, 
    unifyCommon,
    handleLikeData,
    isCheck,
    isLike,
    ticket,    
    flightList,
}){
    const dispatch = useDispatch();

    const [ticketType, setTicketType] = useState(true); //앞면<->뒷면
    const [contentType, setContentType] = useState(true); //앞면 개요<->상세
    const [check, setCheck] = useState(isCheck) //체크 여부
    const [like, setLike] = useState(isLike);
    useEffect(() => {
        setCheck(isCheck);
    }, [isCheck]);
    useEffect(() => {
        setLike(isLike);
    }, [isLike])
    const [changing, setChanging] = useState(false); //변화하는 애니메이션
    const ticketColor = 'skyblue'; //항공사 대표 색
    const flightTicket = useRef(); // Ticket 컴포넌트
    const flightContent = useRef(); // FrontTicketLeftMiddle 컴포넌트
    
    const priceData = { //항공권 가격 추이 데이터
        avg : 740000,info : [{date:'2023-03-01',price:710000},{date:'2023-03-02',price:720000},{date:'2023-03-03',price:730000},{date:'2023-03-04',price:740000},{date:'2023-03-05',price:750000},{date:'2023-03-06',price:760000},{date:'2023-03-07',price:770000},{date:'2023-03-08',price:780000},{date:'2023-03-09',price:790000},{date:'2023-03-10',price:800000},{date:'2023-03-11',price:710000},{date:'2023-03-12',price:720000},{date:'2023-03-13',price:730000},{date:'2023-03-14',price:740000},{date:'2023-03-15',price:750000},{date:'2023-03-16',price:760000},{date:'2023-03-17',price:770000},{date:'2023-03-18',price:780000},{date:'2023-03-19',price:790000},{date:'2023-03-20',price:800000},],
    };

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
            flightId: ticket.ticketId,
            flightData: {
                ticket,
                flightList,
            }
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
    const handleLike = () => {
        if(isRound){
            unifyCommon('like');
            return;
        }
        const payload = {
            mode: 'oneWay',
            isLike: !like, //목표값
            flightId: ticket.ticketId,
            flightData: {
                ticket,
                flightList,
            }
        }
        //비교 목록에서 눌렸다면? => 세션 스토리지 바꾸고 data에도 바뀐 값 적용해줘야 함
        //아닌데, check에도 있는 값이면? => 세션 스토리지 바꾸고 data에도 바꾸고
        //check에 없는 값이면 => data만 바꾸고
        if(like) {
            alert('알림이 해제되었습니다.');
        }
        else {
            alert('알림이 등록되었습니다.');
        }
        if(check){
            //idx번째 data의 isLike를 바꿔라
            handleLikeData(payload.flightId, !like);
            dispatch(compareAction.updateCompareItem(payload));
        }
        else{
            handleLikeData(payload.flightId, !like);
            setLike((like) => !like);
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
                        <img src={garudaIndonesia} alt='#' width='32' height='32'/>
                        <span style={{marginLeft: '8px'}}>대한항공</span>
                    </TicketLeftTopAirLine>
                    <TicketLeftTopCodeShare>공동</TicketLeftTopCodeShare>
                </TicketLeftTop>
                <FrontTicketLeftMiddle ref={flightContent} onAnimationEnd={() => deleteChangeAnimation(flightContent)}>
                    {!contentType ? <FlightList /> : 
                    <>
                        <FrontTicketLeftMiddlePoint>
                            <div className="point-type">출발</div>
                            <div className="point-content">
                                <div className="point-city">인천</div>
                                <div className="point-code">(ICN)</div>
                            </div>
                            <div className="point-time">09:00</div>
                        </FrontTicketLeftMiddlePoint>
                        <FrontTicketLeftMiddleArrow>
                            <div className="arrow-stopover">프랑크푸르트(FRA)/이스탄불(ISB)</div>
                            <div className="arrow-line"/>
                            <div className="arrow-time">33시간 30분</div>
                        </FrontTicketLeftMiddleArrow>
                        <FrontTicketLeftMiddlePoint>
                            <div className="point-type">도착</div>
                            <div className="point-content" >
                                <div className="point-city">씨엠립(앙코르와트)</div>
                                <div className="point-code">(SER)</div>
                            </div>
                            <div className="point-time">09:00 + 1</div>
                        </FrontTicketLeftMiddlePoint>
                    </>
                    }
                    <MdOutlineChangeCircle className="change-button" onClick={changeContentType} size={24}/>
                </FrontTicketLeftMiddle>
                <FrontTicketLeftBottom />
            </TicketLeft>
            <TicketMiddleBorder />
            <TicketRight>
                <TicketRightTop>
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
                    <div style={{fontSize: '20px', margin: 'auto 0px', fontWeight: '600'}}>1,320,000원</div>
                </div>
                <TicketRightBottom color='skyblue'>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
                                <path fill="#fff" d="M19.7857 10.001383c0 5.404-4.383 9.785-9.786 9.785-5.406 0-9.786-4.381-9.786-9.785 0-5.405 4.38-9.786 9.786-9.786 5.403 0 9.786 4.381 9.786 9.786"/>
                                <path fill="#d52528" d="M14.2033 4.102483c2.981.919 5.147 3.694 5.147 6.976 0 .479-.046.947-.133 1.399l-.011.063c-.228 1.287-.75 2.474-1.495 3.486l-.014.016c1.309-1.665 2.089-3.765 2.089-6.045 0-5.408-4.384-9.792-9.792-9.792-2.463 0-4.713.911-6.435 2.412l-.021.02c-1.356 1.243-2.205 3.032-2.205 5.015 0 .823.146 1.611.412 2.341l.014.033c.68 1.494 2.184 2.53 3.932 2.53 2.385 0 4.32-1.932 4.32-4.317l-.013-1.858c0-.855.477-1.599 1.178-1.979l.007-.006c.55-.302 1.18-.474 1.85-.474.407 0 .798.062 1.166.18z"/>
                                <path fill="#233979" d="M5.797 15.897583c-2.981-.919-5.147-3.694-5.147-6.976 0-.479.046-.947.133-1.399l.011-.063c.228-1.287.75-2.474 1.495-3.486l.014-.016c-1.309 1.665-2.089 3.765-2.089 6.045 0 5.408 4.384 9.792 9.792 9.792 2.463 0 4.713-.911 6.435-2.412l.021-.02c1.356-1.243 2.205-3.032 2.205-5.015 0-.823-.146-1.611-.412-2.341l-.014-.033c-.68-1.494-2.184-2.53-3.932-2.53-2.385 0-4.32 1.932-4.32 4.317l.013 1.858c0 .855-.477 1.599-1.178 1.979l-.007.006c-.55.302-1.18.474-1.85.474-.407 0-.798-.062-1.166-.18z"/>
                            </svg>
                            <span>대한항공</span>
                        </TicketLeftTopAirLine>
                        <TicketLeftTopCodeShare>공동</TicketLeftTopCodeShare>
                    </TicketLeftTop>
                    <BackTicketLeftMiddle id="ticket-left-middle" ref={flightContent} onAnimationEnd={deleteChangeAnimation}>
                        <LineChart priceData={priceData}/>
                    </BackTicketLeftMiddle>
                </TicketLeft>
                <TicketMiddleBorder/>
                <TicketRight>
                    <TicketRightTop>
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
                    <BackTicketRightMiddle>
                        <div className="right-analysis">
                            <div>현재가</div>
                            <div>824,000원</div>
                        </div>
                        <div className="right-analysis">
                            <div>평균 대비</div>
                            <div>30% 상승</div>
                        </div>
                        <div className="right-analysis">
                            <div>선택일 대비</div>
                            <div>10% 하락</div>
                        </div>
                        <div className="right-analysis">
                            <div>12일 간 상승세</div>
                        </div>
                    </BackTicketRightMiddle>
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
    background-color: skyblue;
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
    background-color: skyblue;
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