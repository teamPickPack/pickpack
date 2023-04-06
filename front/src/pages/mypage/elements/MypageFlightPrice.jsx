import {useState} from 'react';
import styled from 'styled-components';
import { member } from '../../../apis/member';

export default function MypageFlightPrice({wantedPrice, wish, wayId}) {
    const [price, setPrice] = useState(wantedPrice);
    const handlePrice = (event) => {
        if(isNaN(Number(event.target.value))) return;
        if(Number(event.target.value) === 0) setPrice(0);
        setPrice(Number(event.target.value.trim()));
    }
    const doWish = async () => {
        if(window.confirm(`${price.toLocaleString('ko-kr')}원으로 가격을 수정하시겠습니까?`)) {
            if(wish === 'one'){
                const data = {
                    onewayTicketLikeId: wayId,
                    wishPrice: price,
                };
    
                const response = await member.onewish(data);
                console.log(response);
            } else {
                const data = {
                    roundwayTicketLikeId: wayId,
                    wishPrice: price,
                }
                const response = await member.roundwish(data);
                console.log(response);
            }
        }
    }
    return(
        <div style={{border: '1px solid black', borderRadius: '16px', width: '240px', height: '80px',padding: '20px 0px', backgroundColor: '#E9E7EF', marginLeft: '40px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',  padding: '0px 40px'}}>
                <div style={{fontWeight: 'bold'}}>가격 알림</div>
                <WishBtn onClick={doWish}><span>수정</span></WishBtn>
            </div>
            <br></br>
            <div><input type='text' value={price} onChange={handlePrice} />원</div>
        </div>
    )
}

const WishBtn = styled.div`
    border: 1px solid black;
    padding: 4px 16px;
    border-radius: 8px;
    background-color: #432C7A;
    color: white;
    font-weight: bold;
`