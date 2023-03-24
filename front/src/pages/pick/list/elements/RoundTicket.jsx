import {useState, useEffect} from 'react';
import styled from 'styled-components';
import OneWayTicket from "./OneWayTicket"

export default function RoundTicket({isCheck, isLike, goWay, returnWay, totalPrice}){

    useEffect(() => {
        const list = document.querySelectorAll('.tickets > div')
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
            })
        })
        let array = [...list]
        let zIndexArray = array.map(arr => Number(arr.style.zIndex))
    }, []);

    const [commonAlarmChecked, setCommonAlarmChecked] = useState(isLike);
    const [commonCompareChecked, setCommonCompareChecked] = useState(isCheck);
    const unifyChecked = (type) => {
        if(type === 'compare'){
            console.log('compareChecked 동기화하기')
            // setUnifyCompareChecked((unifyCompareChecked) => !unifyCompareChecked);
        } else{
            console.log('alarmChecked 동기화하기');
            if(commonAlarmChecked) alert('알림이 해제되었습니다.');
            else alert('알림이 등록되었습니다.');
            setCommonAlarmChecked((commonAlarmChecked) => !commonAlarmChecked);
        }
    }
    return(
        <>
        <Tickets className="tickets">
            <ReturnTicket>
                <OneWayTicket unifyChecked={unifyChecked} twoWay={true} isLike={commonAlarmChecked} ticket={returnWay.ticket} flightList={returnWay.flightList}/>
            </ReturnTicket>
            <GoTicket>
                <OneWayTicket unifyChecked={unifyChecked} twoWay={true} isLike={commonAlarmChecked} ticket={goWay.ticket} flightList={goWay.flightList}/>
            </GoTicket>
            <TotalPrice>총 2,640,000원</TotalPrice>
        </Tickets>
        </>
    )
}

const Tickets = styled.div`
    width: 800px;
    height: 320px;
    border: 2px solid blue;
    position: relative;
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