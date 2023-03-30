import FlightList from "./FlightList"
import {useState} from 'react';
import styled from "styled-components";

export default function CompareModalItem({item, color}) {
    const [showDetail, setShowDetail] = useState(false);
    return(
        <BodyRow>
        {!showDetail ? <>
            <td>
                <div>인천(ICN)</div>
                <div>2023.03.23 12:40</div>
            </td>
            <td>
                <div>인천(ICN)</div>
                <div>2023.03.23 12:40</div>
            </td>
            <td>
                <div>경유 2회</div>
                <div>프랑크푸르트(FRA)</div>
                <div>이스탄불(IST)</div>
            </td>
            <td>
                <div>33시간 50분</div>
            </td>
            <td>
                <div>대한항공</div>
            </td>
            <td>
                <div>823,000원</div>
            </td>
        </> : 
            <td colSpan={6} style={{border: '1px solid gray', maxWidth: '900px', diplay: 'flex', justifyContent: 'space-between', position: 'relative'}}>
                <FlightList fromCompare={true}/>
            </td>
        }   
            <td>
                <DetailButton color={color} onClick={() => setShowDetail((showDetail) => !showDetail)}>{showDetail? '닫기' : '펼치기'}</DetailButton>
            </td>
        </BodyRow>
    )
}

const BodyRow = styled.tr`
    height: 164px;
    td {
        border: 1px solid black;
        
        div {
            font-size: 16px;
            font-weight: bold;
        }
    }
`

const DetailButton = styled.div`
    width: 64px;
    height: 32px;
    display: flex;
    margin:0px auto;
    color: white;
    box-shadow: 1px 1px 2px black;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background-color: ${(props) => props.color};

    &:hover {
        opacity: .7;
        cursor: pointer;
    }
`