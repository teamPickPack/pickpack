import FlightList from "./FlightList"
import {useState} from 'react';

export default function CompareModalItem({item, color}) {
    const [showDetail, setShowDetail] = useState(false);
    return(
        <tr>
        {!showDetail ? <>
            <td style={{border: '1px solid gray', height: '80px'}}>
                <div>인천(ICN)</div>
                <div>2023.03.23 12:40</div>
            </td>
            <td style={{border: '1px solid gray', height: '80px'}}>
                <div>인천(ICN)</div>
                <div>2023.03.23 12:40</div>
            </td>
            <td style={{border: '1px solid gray', height: '80px'}}>
                <div>경유 2회</div>
                <div>프랑크푸르트(FRA)</div>
                <div>이스탄불(IST)</div>
            </td>
            <td style={{border: '1px solid gray', height: '80px'}}>
                <div>33시간 50분</div>
            </td>
            <td style={{border: '1px solid gray', height: '80px'}}>
                <div>대한항공</div>
            </td>
            <td style={{border: '1px solid gray', height: '80px'}}>
                <div>823,000원</div>
            </td>
        </> : 
            <td colSpan={6} style={{border: '1px solid gray', maxWidth: '900px', diplay: 'flex', justifyContent: 'space-between', position: 'relative'}}>
                <FlightList fromCompare={true}/>
            </td>
        } 
            <td style={{border: '1px solid gray', height: showDetail? '160px' : '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{width: '64px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '16px', backgroundColor: color}} onClick={() => setShowDetail((showDetail) => !showDetail)}>펼치기</div>
            </td>
        </tr>
    )
}