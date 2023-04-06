import {useEffect, useState} from 'react';
import styled from "styled-components"
import MypageTab from './elements/MypageTab';
import MypageFlight from './elements/MypageFlight';
import MypageItem from './elements/MypageItem';
import MypageUser from './elements/MypageUser';
export default function Mypage(){
    const [mypageMode, setMypageMode] = useState(1);
    const [mypageTab, setMypageTab] = useState(1);
    const [top, setTop] = useState(0);
    useEffect(() => {
        window.addEventListener("scroll", () => setTop(window.screenTop));
        window.removeEventListener("scroll", setTop(window.screenTop));
    }, []);
    useEffect(()=>{
        console.log(top);
    }, [top])
    return(
        <div style={{display: 'flex', position: 'relative'}}>
            <MypageLeft Top={top}>
                <LeftTitle>
                    <span>마이페이지</span>
                </LeftTitle>
                <LeftContent onClick={() => setMypageMode(1)} isFocused={mypageMode === 1 ? true : false}>
                    <span>항공권</span>
                </LeftContent>
                <LeftContent onClick={() => setMypageMode(2)} isFocused={mypageMode === 2 ? true : false}>
                    <span>여행용품</span>
                </LeftContent>
                <LeftContent onClick={() => setMypageMode(3)} isFocused={mypageMode === 3 ? true : false}>
                    <span>회원정보수정</span>
                </LeftContent>
            </MypageLeft>
            <div>
                <MypageTab mypageMode={mypageMode} setMypageTab={setMypageTab}/>
                {mypageMode === 1 && <MypageFlight mypageTab={mypageTab} />}
                {mypageMode === 2 && <MypageItem mypageTab={mypageTab} />}
                {mypageMode === 3 && <MypageUser />}
            </div>
        </div>
    )
}

const MypageLeft = styled.div`
    width: 240px;
    background-color: #E9E7EF;
    height: 100vh;
    position: sticky;
    top: 0px;
`;

const LeftTitle = styled.div`
    height: 144px;
    font-weight: bold;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LeftContent = styled.div`
    height: 72px;
    border-top: 1px solid black;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.isFocused? '#D5D1E1' : 'none'};
    &:last-child {
        border-bottom: 1px solid black;
    }
    &:hover {
        cursor: pointer;
        background-color: #D5D1E1;
    }
`;