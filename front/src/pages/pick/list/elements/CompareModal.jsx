import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LineChart from './LineChart';
import CompareModalItem from './CompareModalItem';

export const CloseSVG = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1L1 13"
          stroke="#6C6F75"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 1L13 13"
          stroke="#6C6F75"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
};
export default function CompareModal({handleCompareModalVisible}){
    const color = ['#FF0013', 'orange', '#1CC500', '#72A2FF', 'purple'];
    const compareList = useSelector((state)=>{
        return state.compare.compareList;
    });
    const priceData = [
        { //항공권 가격 추이 데이터
            avg : 740000/4*3,info : [{date:'2023-03-06',price:760000/4*3},{date:'2023-03-07',price:770000/4*3},{date:'2023-03-08',price:780000/4*3},{date:'2023-03-09',price:790000/4*3},{date:'2023-03-10',price:800000/4*3},{date:'2023-03-11',price:710000/4*3},{date:'2023-03-12',price:720000/4*3},{date:'2023-03-13',price:730000/4*3},{date:'2023-03-14',price:740000/4*3},{date:'2023-03-15',price:750000/4*3},{date:'2023-03-16',price:760000/4*3},{date:'2023-03-17',price:770000/4*3},{date:'2023-03-18',price:780000/4*3},{date:'2023-03-19',price:790000/4*3},{date:'2023-03-20',price:800000/4*3},],
        },
        { //항공권 가격 추이 데이터
            avg : 740000,info : [{date:'2023-03-01',price:1230000},{date:'2023-03-02',price:720000},{date:'2023-03-03',price:730000},{date:'2023-03-04',price:740000},{date:'2023-03-05',price:1230000},{date:'2023-03-06',price:760000},{date:'2023-03-07',price:770000},{date:'2023-03-08',price:780000},{date:'2023-03-09',price:790000},{date:'2023-03-10',price:800000},{date:'2023-03-11',price:710000},{date:'2023-03-12',price:720000},{date:'2023-03-13',price:730000},{date:'2023-03-14',price:740000},{date:'2023-03-15',price:750000},{date:'2023-03-16',price:760000},{date:'2023-03-17',price:770000},{date:'2023-03-18',price:780000},{date:'2023-03-19',price:790000},{date:'2023-03-20',price:800000},],
        },
    ];
    const closeModal = () => {
        handleCompareModalVisible('button');
    }
    return(
        <CompareModalBox>
            <CloseBox onClick={closeModal}>
                <CloseSVG className="close-button" />
            </CloseBox>
            <br></br>
            <CompareTable>
                <h2>항공권 비교 테이블</h2>
                <CompareTableContent>
                    <thead>
                        <tr>
                            <th className='wideTHead'>출발정보</th>
                            <th className='wideTHead'>도착정보</th>
                            <th className='wideTHead'>경유정보</th>
                            <th className='narrowTHead'>소요시간</th>
                            <th className='narrowTHead'>항공사</th>
                            <th className='narrowTHead'>가격</th>
                            <th className='narrowTHead'>상세정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compareList.map((compareItem, index) => (
                            <CompareModalItem key={compareItem.flightId} item={compareItem} color={color[index]}/>
                        ))}
                    </tbody>
                </CompareTableContent>
            </CompareTable>
            <br/><br/>
            <CompareGraph>
                <h2>항공권 그래프</h2>
                <LineChart priceData={priceData} onCompare={true}/>
                <CompareLabelBox>
                    {compareList.map((compareItem, index) => (
                        <CompareLabelList key={compareItem.flightId}>
                            <CompareGraphLabel color={color[index]} />
                            <div>&nbsp;인천 - 파리</div>
                        </CompareLabelList>
                    ))}
                </CompareLabelBox>
            </CompareGraph>
        </CompareModalBox>
    )
}

const CompareModalBox = styled.div`
    position: fixed;
    overflow-y: scroll;
    margin: auto;
    top:40px;
    bottom: 40px;
    left:0px;
    right:0px;
    z-index: 99;
    background-color: #D9D9D9;
    width: 1080px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;
const CloseBox = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    &:hover{
        cursor: pointer;
    }
`
const CompareTable = styled.div`
    position: relative;
    border-radius: 16px;
    padding: 8px 16px;
    text-align: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const CompareTableContent = styled.table`
    border-collapse: collapse;
    padding: 20px;
    thead th {
        font-size: 16px;
        font-weight: bold;
        border: 1px solid black;
        padding: 8px 0px;
        background-color:#D9D9D9;
    }

    .wideTHead{
        width: 200px;
    }
    .narrowTHead{
        width: 100px;
    }
`;

const CompareGraph = styled.div`
    position: relative;
    width: 1000px;
    border-radius: 16px;
    background-color: white;
    padding: 20px;
`;

const CompareLabelBox = styled.div`
    height: 80px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const CompareLabelList = styled.div`
    display: flex;
    align-items: center;
`;
const CompareGraphLabel = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 2px;
    background-color: ${(props) => props.color};
`;