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
                setDealData(response);
            }
            else if(mypageTab === 2) {
                const response = await member.rent(memberId);
                setRentData(response);
            }
            else {
                const response = await member.item(memberId);
                setItemData(response);
            }
        };
        getData();
    }, [mypageTab])
    return(
        <div style={{width: '800px', marginLeft: '160px', marginBottom: '80px'}}>
            {mypageTab === 1 ? dealData && 
            <div style={{border: '3px solid black'}}>
                <Bar><span>살게요</span></Bar>
                <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                    {dealData.buyItemList.length > 0 ? <ItemList itemList={dealData.buyItemList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
                </div>
                <Bar><span>팔게요</span></Bar>
                <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                    {dealData.sellItemList.length > 0 ? <ItemList itemList={dealData.sellItemList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
                </div>
            </div> : null}
            {mypageTab === 2 ? rentData && 
            <div style={{border: '3px solid black'}}>
                <Bar><span>빌려주세요</span></Bar>
                <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                    {rentData.rentItemList.length > 0 ? <ItemList itemList={rentData.rentItemList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
                </div>
                <Bar><span>빌려줄게요</span></Bar>
                <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                    {rentData.borrowItemList.length > 0 ? <ItemList itemList={rentData.borrowItemList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
                </div>
            </div> : null}
            {mypageTab === 3 ? itemData && 
            <div style={{border: '3px solid black'}}>
                <Bar><span>거래</span></Bar>
                <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                    {itemData.buyWishList.length > 0 ? <ItemList itemList={itemData.buyWishList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
                </div>
                <Bar><span>대여</span></Bar>
                <div style={{display: 'flex', overflowX: 'scroll', width: '100%'}}>
                    {itemData.borrowWishList.length > 0 ? <ItemList itemList={itemData.borrowWishList} /> : <EmptyDiv><span>목록이 없습니다.</span></EmptyDiv>}
                </div>
            </div> : null}
        </div>
    )
};

const Bar = styled.div`
    width: 100%;
    font-size: 32px;
    text-align: left;
    padding-bottom: 16px;
    border-bottom: 1px solid red;

    span {
        margin-left: 40px;
    }
`
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