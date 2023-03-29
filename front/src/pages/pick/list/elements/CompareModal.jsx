import { useSelector } from 'react-redux';
import CompareModalItem from './CompareModalItem';
export default function CompareModal(){
    const color = ['#FF0013', 'orange', '#1CC500', '#72A2FF', 'purple'];
    const compareList = useSelector((state)=>{
        return state.compare.compareList;
    });
    return(
        <div style={{border: '3px solid red', textAlign: 'center', display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
            <h2>항공권 비교 테이블</h2>
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th  style={{border: '1px solid black', width: '200px'}}>출발정보</th>
                        <th  style={{border: '1px solid black', width: '200px'}}>도착정보</th>
                        <th  style={{border: '1px solid black', width: '200px'}}>경유정보</th>
                        <th  style={{border: '1px solid black', width: '100px'}}>소요시간</th>
                        <th  style={{border: '1px solid black', width: '100px'}}>항공사</th>
                        <th  style={{border: '1px solid black', width: '100px'}}>가격</th>
                        <th  style={{border: '1px solid black', width: '100px'}}>상세정보</th>
                    </tr>
                </thead>
                <tbody>
                    {compareList.map((compareItem, index) => (
                       <CompareModalItem key={compareItem.flightId} item={compareItem} color={color[index]}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}