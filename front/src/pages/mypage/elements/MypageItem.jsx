import {useState, useEffect} from 'react';
import { member } from '../../../apis/member';
import { useSelector } from 'react-redux';
import ItemList from '../../../components/pack/common/ItemList';
import styled from 'styled-components';

export default function MypageItem({mypageTab}) {

    const memberId = useSelector((state) => {
        return state.user.memberId;
    });

    const [dealData, setDealData] = useState(null);
    const [rentData, setRentData] = useState(null);
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if(mypageTab === 1) {
                const response = await member.deal(memberId);
                console.log(response);
                setDealData(response);
            }
            else if(mypageTab === 2) {
    
            }
            else {
    
            }
        };
        getData();
    }, [mypageTab])
    return(
        <div style={{position: 'absolute', left: '400px', right: '80px'}}>
            {mypageTab === 1 ? dealData && <div style={{border: '3px solid black'}}>
            <div style={{width: '100%',fontSize: '32px',textAlign: 'left',paddingBottom: '16px', borderBottom: '1px solid red'}}><span style={{marginLeft: '40px'}}>살게요</span></div>
            <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                {dealData.buyItemList.length > 0 ? <ItemList itemList={dealData.buyItemList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
            </div>
            <div style={{width: '100%',fontSize: '32px',textAlign: 'left',paddingBottom: '16px', borderBottom: '1px solid red'}}><span style={{marginLeft: '40px'}}>팔게요</span></div>
            <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                {dealData.sellItemList.length > 0 ? <ItemList itemList={dealData.sellItemList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
            </div>
        </div> : null}
        </div>
    )
};

const EmptyDiv = styled.div`
    height: 320px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        font-size: 32px;
        font-weight: bold;
    }
`;