import { useState, useEffect } from 'react';
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
    const compareMode = useSelector((state) => {
        return state.compare.compareMode;
    })
    const [graphAvail, setGraphAvail] = useState(false);
    useEffect(() => {
        let flag = true;
        for(let i = 0; i < compareList.length; i++){
            if(compareList[i].priceData === 'no Info') {
                flag = false;
                setGraphAvail(false);
            }
        }
        if(flag) setGraphAvail(true)
    }, [compareList])
    const priceData = compareList.map((compareItem) => {
        // if(compareItem.priceData === 'no Info') setGraphAvail(false);
        return compareItem.priceData;
    });
    // useEffect(() => {
    //     setGraphAvail(true);
    //     console.log('hihi');
    //     setPriceData(compareList.map((compareItem) => {
    //         if(compareItem.priceData === 'no Info') setGraphAvail(false);
    //         return compareItem.priceData
    //     }))
    // }, [compareList]);
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
                        {compareMode === 'oneWay' ? compareList.map((compareItem, index) => (
                            <CompareModalItem mode={'one'} key={compareItem.flightId} item={compareItem} color={color[index]}/>
                        )) : compareList.map((compareItem, index) => (
                            <>
                            <CompareModalItem mode={'round'} key={`${compareItem.flightId}-1`} item={compareItem.flightData[0]} color={color[index]}/>
                            <CompareModalItem mode={'round'} dashed={true} key={`${compareItem.flightId}-2`} item={compareItem.flightData[1]} color={color[index]}/>
                        </>
                        ))}
                    </tbody>
                </CompareTableContent>
            </CompareTable>
            <br/><br/>
            <CompareGraph>
                <h2>항공권 그래프</h2>
                {compareMode === 'oneWay' && graphAvail? <LineChart priceData={priceData} onCompare={true}/> : <div>항공권 그래프가 지원되지 않습니다.</div>}
                {compareMode === 'oneWay' ? <CompareLabelBox>
                    {compareList.map((compareItem, index) => (
                        <CompareLabelList key={compareItem.flightId}>
                            <CompareGraphLabel color={color[index]} />
                            <div>&nbsp;{compareItem.flightData.ticket.depName} - {compareItem.flightData.ticket.arrName}</div>
                        </CompareLabelList>
                    ))}
                </CompareLabelBox> : null}
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