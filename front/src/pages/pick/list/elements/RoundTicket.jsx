import {useEffect, useState} from 'react';
import styled from 'styled-components';
import OneWayTicket from "./OneWayTicket"


export default function RoundTicket(){
    useEffect(() => {
        const list = document.querySelectorAll('.container > div')
        list.forEach((el, index) => {
            el.style.zIndex = index  
            el.addEventListener('click', function(){
                let maxNum = Math.max(...zIndexArray)
                let maxIndex = zIndexArray.findIndex(arr => arr === maxNum)
                console.log(index)
                console.log(maxNum, maxIndex)
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
    const handleZIndex = (type) => {
        if(type === 'go'){
            console.log('GO 올려라');
        }
        else{
            console.log('RETURN 올려라');
        }
    }
    return(
        <>
        <div className="container" style={{width: '800px', height: '320px', border: '2px solid blue', position: 'relative'}}>
            <GoTicket className='tickets' onClick={() => handleZIndex('go')}>
                <OneWayTicket twoWay={true}/>
            </GoTicket>
            <ReturnTicket className='tickets' onClick={() => handleZIndex('return')}>
                <OneWayTicket twoWay={true}/>
            </ReturnTicket>
            <TotalPrice>Total Price</TotalPrice>
        </div>
        <div className="container" style={{width: '800px', height: '320px', border: '2px solid blue', position: 'relative'}}>
            <GoTicket className='tickets' onClick={() => handleZIndex('go')}>
                <OneWayTicket twoWay={true}/>
            </GoTicket>
            <ReturnTicket className='tickets' onClick={() => handleZIndex('return')}>
                <OneWayTicket twoWay={true}/>
            </ReturnTicket>
            <TotalPrice>Total Price</TotalPrice>
        </div>
        <div className="container" style={{width: '800px', height: '320px', border: '2px solid blue', position: 'relative'}}>
            <GoTicket className='tickets' onClick={() => handleZIndex('go')}>
                <OneWayTicket twoWay={true}/>
            </GoTicket>
            <ReturnTicket className='tickets' onClick={() => handleZIndex('return')}>
                <OneWayTicket twoWay={true}/>
            </ReturnTicket>
            <TotalPrice>Total Price</TotalPrice>
        </div>
        </>
    )
}
const GoTicket = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    &:hover{
        cursor: pointer;
    }
`

const ReturnTicket = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
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