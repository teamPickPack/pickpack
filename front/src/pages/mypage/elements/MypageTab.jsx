import {useState, useEffect} from 'react';
import styled from 'styled-components';

export default function MypageTab({mypageMode}){
    const [mypageTab, setMypageTab] = useState(1);
    useEffect(() => {
        setMypageTab(1);
    }, [mypageMode])
    return(
        <TabBox>
            {mypageMode === 1 && <Tab order={mypageTab}>
                <span onClick={() => setMypageTab(1)}>편도</span>
                <span onClick={() => setMypageTab(2)}>왕복</span>
            </Tab>}
            {mypageMode === 2 && <Tab order={mypageTab}>
                <span onClick={() => setMypageTab(1)}>거래</span>
                <span onClick={() => setMypageTab(2)}>대여</span>
                <span onClick={() => setMypageTab(3)}>찜</span>
            </Tab>}
            {mypageMode === 3 && <></>}
        </TabBox>
    )
}

const TabBox = styled.div`
    border: 1px solid black;
    // position: relative;
    div {
        &:first-child {
            height: 160px;
            padding-left: 80px;
        }
    }
`;

const Tab = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    span { 
        width: 64px;
        padding: 0px 8px;
        margin: 0px 8px;
        font-size: 32px;
        &:nth-child(${(props)=>props.order}) {
            border-bottom: 2px solid #432c7a;
            font-weight: bold;
        }

        &:hover {
            cursor: pointer;
            opacity: .7;
            border-bottom: 1px solid #80489C;
        }
    }
`;