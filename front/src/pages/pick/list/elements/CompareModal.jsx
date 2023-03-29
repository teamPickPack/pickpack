import { useSelector, useDispatch } from 'react-redux';
import FlightList from './FlightList';
export default function CompareModal(){
    const compareList = useSelector((state)=>{
        return state.compare.compareList;
    });
    const compareMode = useSelector((state) => {
        return state.compare.compareMode;
    });
    return(
        <div style={{border: '3px solid red'}}>
            {compareList.map((compareItem) => (
                <li key={compareItem.flightId}>{compareItem.flightId}</li>
            ))}
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th  style={{border: '1px solid black'}}>출발정보</th>
                        <th  style={{border: '1px solid black'}}>도착정보</th>
                        <th  style={{border: '1px solid black'}}>경유정보</th>
                        <th  style={{border: '1px solid black'}}>소요시간</th>
                        <th  style={{border: '1px solid black'}}>항공사</th>
                        <th  style={{border: '1px solid black'}}>가격</th>
                        <th  style={{border: '1px solid black'}}>상세정보</th>
                    </tr>
                </thead>
                <tbody>
                    {compareList.map((compareItem) => (
                        <>
                            <tr>
                                <td style={{border: '1px solid gray', height: '160px'}}>
                                    <div>인천(ICN)</div>
                                    <div>2023.03.23 12:40</div>
                                </td>
                                <td style={{border: '1px solid gray', height: '160px'}}>
                                    <div>인천(ICN)</div>
                                    <div>2023.03.23 12:40</div>
                                </td>
                                <td style={{border: '1px solid gray', height: '160px'}}>
                                    <div>경유 2회</div>
                                    <div>프랑크푸르트(FRA)</div>
                                    <div>이스탄불(IST)</div>
                                </td>
                                <td style={{border: '1px solid gray', height: '160px'}}>
                                    <div>33시간 50분</div>
                                </td>
                                <td style={{border: '1px solid gray', height: '160px'}}>
                                    <div>대한항공</div>
                                </td>
                                <td style={{border: '1px solid gray', height: '160px'}}>
                                    <div>823,000원</div>
                                </td>
                                <td style={{border: '1px solid gray', height: '160px'}}>
                                    <div>펼치기</div>
                                </td>
                            </tr>
                            <FlightList/>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}