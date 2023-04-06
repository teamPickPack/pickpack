import {useState, useEffect} from 'react';
import { member } from '../../../apis/member';
import { useSelector } from 'react-redux';
import OneWayTicket from '../../pick/list/elements/OneWayTicket';
import RoundTicket from '../../pick/list/elements/RoundTicket';
import MypageFlightPrice from './MypageFlightPrice';
import styled from 'styled-components';

export default function({mypageTab}) {
    const memberId = useSelector((state) => {
        return state.user.memberId;
    });
    const [oneData, setOneData] = useState(null);
    const [roundData, setRoundData] = useState(null);
    console.log(oneData);
    const handleLikeData = (ticketId, value) => {

    }
    useEffect(() => {
        const getData = async () => {
            if(mypageTab === 1) {
                const response = await member.one(memberId);
                console.log(response);
                setOneData(response);
            }
            else {
                const response = await member.round(memberId);
                console.log(response);
                setRoundData(response);
            }
        };
        getData();
    }, [mypageTab])
    return(
        <div>
            {mypageTab === 1 ? oneData &&
            oneData.map((one) => 
                <div key={one.ticket.id} style={{display: 'flex',alignItems: 'center', marginLeft: '160px'}}>
                    <OneWayTicket isRound={false} handleLikeData={handleLikeData} isLike={one.isLike} ticket={one.ticket} />
                    <MypageFlightPrice wantedPrice={one.wantedPrice} wish={'one'} wayId={one.onewayId}/>
                </div>
            ) : <span>?!</span>}
            {mypageTab === 2 ? roundData &&
            roundData.map((one) => {
                <div style={{display: 'flex',alignItems: 'center', border: '2px solid black',}}>
                    <RoundTicket />
                    <MypageFlightPrice wantedPrice={one.wantedPrice} wish={'round'} wayId={one.roundwayId}/>
                </div>
            }) : null}
        </div>
    )
}