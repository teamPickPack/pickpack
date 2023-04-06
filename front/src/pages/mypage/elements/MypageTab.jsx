import {useState, useEffect} from 'react';
import styled from 'styled-components';

export default function MypageTab({mypageMode, setMypageTab}){
    const [tab, setTab] = useState(1);
    useEffect(() => {
        setTab(1);
    }, [mypageMode])
    return(
        <TabBox>
            {mypageMode === 1 && <Tab order={tab}>
                <span onClick={() => {setTab(1); setMypageTab(1);}}>편도</span>
                <span onClick={() => {setTab(2); setMypageTab(2);}}>왕복</span>
            </Tab>}
            {mypageMode === 2 && <Tab order={tab}>
                <span onClick={() => {setTab(1); setMypageTab(1);}}>거래</span>
                <span onClick={() => {setTab(2); setMypageTab(2);}}>대여</span>
                <span onClick={() => {setTab(3); setMypageTab(3);}}>찜</span>
            </Tab>}
            {mypageMode === 3 && <></>}
        </TabBox>
    )
}

const TabBox = styled.div`
    width: 400px;
    // position: absolute;
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