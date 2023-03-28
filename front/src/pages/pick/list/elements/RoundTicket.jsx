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
        // console.log(list);
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
                    if(zIndexArray[i] < zIndexArray[i+1]){
                        list[i].style.opacity = '.7';
                        list[i+1].style.opacity = '1';
                    } else{
                        list[i].style.opacity = '1';
                        list[i+1].style.opacity = '.7';
                    }
                }
            })
        })
        let array = [...list]
        let zIndexArray = array.map(arr => Number(arr.style.zIndex))
        for(let i = 0; i < zIndexArray.length; i+=2){
            if(zIndexArray[i] < zIndexArray[i+1]){
                list[i].style.opacity = '.5';
                list[i+1].style.opacity = '1';
            } else{
                list[i].style.opacity = '1';
                list[i+1].style.opacity = '.5';
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
                isLike,
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
                    alert('편도와 왕복을 동시에 담을 순 없어요,,,,');
                    return;
                }
                else if(compareList.length >= 5){
                    alert('다섯개 꽉 찼으요...');
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
            <ReturnTicket className="ticket">
                <OneWayTicket fromCompare={fromCompare} isRound={true} unifyCommon={unifyCommon} handleLikeData={handleLikeData} isCheck={commonCheck} isLike={commonLike} ticket={returnWay.ticket} flightList={returnWay.flightList}/>
            </ReturnTicket>
            <GoTicket className="ticket">
                <OneWayTicket fromCompare={fromCompare} isRound={true} unifyCommon={unifyCommon} handleLikeData={handleLikeData} isCheck={commonCheck} isLike={commonLike} ticket={goWay.ticket} flightList={goWay.flightList}/>
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
`;
const GoTicket = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    &:hover{
        cursor: pointer;
    }
`;

const ReturnTicket = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    &:hover{
        cursor: pointer;
    }
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