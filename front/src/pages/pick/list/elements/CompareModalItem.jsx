import FlightList from "./FlightList"
import {useState} from 'react';
import styled from "styled-components";

export default function CompareModalItem({dashed, mode, item, color}) {
    const [showDetail, setShowDetail] = useState(false);
    return(
        <BodyRow dashed={dashed}>
        {!showDetail ? <>
            <td>
                {mode === 'one' ?
                <>
                    <div>{`${item.flightData.ticket.depName}(${item.flightData.ticket.depCode})`}</div>
                    <div>{item.flightData.ticket.depDate.replaceAll("-",".")} {item.flightData.ticket.depTime}</div>
                </> : <>
                    <div>{`${item.ticket.depName}(${item.ticket.depCode})`}</div>
                    <div>{item.ticket.depDate.replaceAll("-",".")} {item.ticket.depTime}</div>
                </>}
            </td>
            <td>
                {mode === 'one' ?
                    <>
                        <div>{`${item.flightData.ticket.arrName}(${item.flightData.ticket.arrCode})`}</div>
                        <div>{item.flightData.ticket.arrDate.replaceAll("-",".")} {item.flightData.ticket.arrTime}</div>
                    </> : <>
                        <div>{`${item.ticket.arrName}(${item.ticket.arrCode})`}</div>
                        <div>{item.ticket.arrDate.replaceAll("-",".")} {item.ticket.arrTime}</div>
                    </>
                }
            </td>
            <td>
                {mode === 'one' ?
                    <>
                        <div>{item.flightData.ticket.waypointNum === 0 ? `직항` : `경유 ${item.flightData.ticket.waypointNum}회`}</div>
                        {item.flightData.ticket.waypointNum > 0 ? item.flightData.ticket.flightList.map((flight, index) => {
                            if(index !== item.flightData.ticket.waypointNum) return <div key={`${flight.arrName}-${index}`}>{`${flight.arrName}(${flight.arrCode})`}</div>
                        }) : null}
                    </> : <>
                        <div>{item.ticket.waypointNum === 0 ? `직항` : `경유 ${item.ticket.waypointNum}회`}</div>
                        {item.ticket.waypointNum > 0 ? item.ticket.flightList.map((flight, index) => {
                            if(index !== item.ticket.waypointNum) return <div key={`${flight.arrName}-${index}`}>{`${flight.arrName}(${flight.arrCode})`}</div>
                        }) : null}
                    </>
                }
            </td>
            <td>
                {mode === 'one' ?
                    <div>{item.flightData.ticket.totalTime}</div> : <div>{item.ticket.totalTime}</div>
                }
            </td>
            <td>
                {mode === 'one' ?
                    <div>{item.flightData.ticket.airline}</div> : <div>{item.ticket.airline}</div>
                }
            </td>
            <td>
                {mode === 'one' ?
                    <div>{item.flightData.ticket.price.toLocaleString('ko-kr')}원</div> : <div>{item.ticket.price.toLocaleString('ko-kr')}원</div>
                }
            </td>
        </> : 
            <td colSpan={6} style={{border: '1px solid gray', maxWidth: '900px', diplay: 'flex', justifyContent: 'space-between', position: 'relative'}}>
                {mode === 'one' ?
                    <FlightList data={item.flightData.ticket.flightList} fromCompare={true}/> : <FlightList data={item.ticket.flightList} fromCompare={true}/>
                }
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
        border-top: ${(props) => props.dashed? '1px solid white' : '1px solid black'};
        border-bottom: ${(props) => props.dashed? '1px solid black' : '1px solid white'};
        border-left: 1px solid black;
        border-right: 1px solid black;
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