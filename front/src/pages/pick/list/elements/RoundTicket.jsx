import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compareAction } from '../../../../store/compareSlice';
import styled from 'styled-components';
import OneWayTicket from "./OneWayTicket"

export default function RoundTicket({
    fromCompare,
    handleLikeData,
    isCheck,
    isLike,
    goWay,
    returnWay,
    totalPrice
}){
    useEffect(() => {
        const list = document.querySelectorAll('.tickets > .ticket')
        list.forEach((el, index) => {
            el.style.zIndex = index  
            el.addEventListener('click', function(){
                let maxNum = Math.max(...zIndexArray)
                zIndexArray = zIndexArray.map(arr => {
                    if(arr > zIndexArray[index]){
                        return arr - 1
                    } else {
                        return arr
                    }
                })
                zIndexArray[index] = maxNum
                array.forEach((el, index) => {
                    el.style.zIndex = zIndexArray[index]
                })
                for(let i = 0; i < zIndexArray.length; i+=2){
                    if(zIndexArray[i] < zIndexArray[i+1]){ //앞에 있는게 under
                        if(list[i].classList.contains('over')){
                            list[i].classList.remove('over');
                            list[i].classList.add('under');
                            list[i+1].classList.remove('under');
                            list[i+1].classList.add('over');
                        }
                    } else{ //앞에 있는게 over
                        if(list[i].classList.contains('under')){
                            list[i].classList.remove('under');
                            list[i].classList.add('over');
                            list[i+1].classList.remove('over');
                            list[i+1].classList.add('under');
                        }
                    }
                }
            })
        })
        let array = [...list]
        let zIndexArray = array.map(arr => Number(arr.style.zIndex))
        for(let i = 0; i < zIndexArray.length; i+=2){
            if(zIndexArray[i] < zIndexArray[i+1]){ //앞에 있는게 under
                if(list[i].classList.contains('over')){
                    list[i].classList.remove('over');
                    list[i].classList.add('under');
                    list[i+1].classList.remove('under');
                    list[i+1].classList.add('over');
                }
            } else{ //앞에 있는게 over
                if(list[i].classList.contains('under')){
                    list[i].classList.remove('under');
                    list[i].classList.add('over');
                    list[i+1].classList.remove('over');
                    list[i+1].classList.add('under');
                }
            }
        }
    }, []);

    const [commonLike, setCommonLike] = useState(isLike);
    const [commonCheck, setCommonCheck] = useState(isCheck);

    const compareList = useSelector((state)=>{
        return state.compare.compareList;
    });
    const compareMode = useSelector((state) => {
        return state.compare.compareMode;
    });

    useEffect(() => {
        setCommonCheck(isCheck);
    }, [isCheck])
    useEffect(() => {
        setCommonLike(isLike);
    }, [isLike])
    const dispatch = useDispatch();
    
    const unifyCommon = (type) => {
        if(type === 'check'){
            //여기서도 세션 스토리지에 접근해서 데이터 넣어주고 빼줘야 함
            const payload = {
                mode: 'round',
                isLike: commonLike,
                flightId: `${goWay.ticket.ticketId}-${returnWay.ticket.ticketId}`,
                flightData: [
                    {
                        ticket: goWay.ticket,
                        flightList: goWay.flightList,
                    },
                    {
                        ticket: returnWay.ticket,
                        flightList: returnWay.flightList,
                    },
                ]
            }
            if(!commonCheck){
                if(compareList.length !== 0 && compareMode !== 'round'){
                    alert('편도와 왕복을 동시에 비교할 수 없습니다.');
                    return;
                }
                else if(compareList.length >= 3){
                    alert('최대 3개의 항공권을 비교할 수 있습니다.');
                    return;
                }
                setCommonCheck(true);
                dispatch(compareAction.addCompareItem(payload))
            }
            else{
                setCommonCheck(false);
                dispatch(compareAction.deleteCompareItem(payload))
            }
        } else{
            const payload = {
                mode: 'round',
                isLike: !commonLike,
                flightId: `${goWay.ticket.ticketId}-${returnWay.ticket.ticketId}`,
                flightData: [
                    {
                        ticket: goWay.ticket,
                        flightList: goWay.flightList,
                    },
                    {
                        ticket: returnWay.ticket,
                        flightList: returnWay.flightList,
                    },
                ]
            }
            if(commonLike) {
                alert('알림이 해제되었습니다.');
            }
            else {
                alert('알림이 등록되었습니다.');
            }
            if(commonCheck){
                handleLikeData(payload.flightId, !commonLike);
                dispatch(compareAction.updateCompareItem(payload));
            }
            else{
                setCommonLike((commonLike) => !commonLike);
            }
        }
    }
    return(
        <>
        <Tickets className="tickets">
            <ReturnTicket className="ticket under">
                <OneWayTicket className="" fromCompare={fromCompare} isRound={true} unifyCommon={unifyCommon} handleLikeData={handleLikeData} isCheck={commonCheck} isLike={commonLike} ticket={returnWay.ticket} flightList={returnWay.flightList}/>
            </ReturnTicket>
            <GoTicket className="ticket over">
                <OneWayTicket className="" fromCompare={fromCompare} isRound={true} unifyCommon={unifyCommon} handleLikeData={handleLikeData} isCheck={commonCheck} isLike={commonLike} ticket={goWay.ticket} flightList={goWay.flightList}/>
            </GoTicket>
            <TotalPrice>총 2,640,000원</TotalPrice>
        </Tickets>
        </>
    )
}

const Tickets = styled.div`
    width: 800px;
    height: 320px;
    position: relative;
    margin: 8px 0px;

    .under{
        opacity: 0.3;
    }
    .under:hover{
        opacity: 0.7;
        cursor: pointer;
    }

    .over{
        opacity: 1;
    }
`;
const GoTicket = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
`;

const ReturnTicket = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 156px;
    height: 78px;
    font-size: 20px;
    font-weight: 600;
`;