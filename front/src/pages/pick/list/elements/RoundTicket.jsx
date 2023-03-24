import {useState} from 'react';
import styled from 'styled-components';
import OneWayTicket from "./OneWayTicket"

export default function RoundTicket(){
    const [goZIndex, setGoZIndex] = useState(1);
    const [returnZIndex, setReturnZIndex] = useState(-1);

    const handleZIndex = (type) => {
        if(type === 'go'){
            console.log('고 크르릵');
            if(goZIndex === -1) return;
            setGoZIndex(-1);
            setReturnZIndex(1);
        }
        else{
            console.log('리턴 크르릵')
            if(returnZIndex === -1) return;
            setGoZIndex(1);
            setReturnZIndex(-1);
        }
    }
    return(
        <div style={{width: '800px', height: '320px', border: '2px solid blue', position: 'relative'}}>
            <GoTicket onClick={() => handleZIndex('go')} zIndex={goZIndex}>
                <OneWayTicket twoWay={true}/>
            </GoTicket>
            <ReturnTicket onClick={() => handleZIndex('return')} zIndex={returnZIndex}>
                <OneWayTicket twoWay={true}/>
            </ReturnTicket>
            <TotalPrice>Total Price</TotalPrice>
        </div>
    )
}

const GoTicket = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: ${(props) => props.zIndex};
    &:hover{
        cursor: pointer;
    }
`

const ReturnTicket = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: ${(props) => props.zIndex};
    &:hover{
        cursor: pointer;
    }
`

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
`