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
    const handleOneIsLike = (idx) => {
        
    }

    useEffect(() => {
        const getData = async () => {
            if(mypageTab === 1) {
                const response = await member.one(memberId);
                setOneData(response);
            }
            else {
                const response = await member.round(memberId);
                setRoundData(response);
            }
        };
        getData();
    }, [mypageTab])
    return(
        <div>
            {mypageTab === 1 ? oneData &&
            oneData.map((one, idx) => {
                return (
                    <div key={one.ticket.id} style={{display: 'flex',alignItems: 'center', marginLeft: '160px'}}>
                    <OneWayTicket idx={idx} isRound={false} isLike={one.isLike} ticket={one.ticket} handleLikeData={handleOneIsLike}/>
                    <MypageFlightPrice wantedPrice={one.wantedPrice} wish={'one'} wayId={one.onewayId}/>
                </div>
                )
            }
            ) : null}
            {mypageTab === 2 ? roundData &&
            roundData.map((one) => {
                console.log(one);
                return(
                    <div key={`${one.goWay.id}-${one.returnWay.id}`} style={{display: 'flex',alignItems: 'center', marginLeft: '160px'}}>
                        <RoundTicket isLike={one.isLike} goWay={one.goWay} returnWay={one.returnWay} totalPrice={one.totalPrice} handleLikeData={handleOneIsLike}/>
                        <MypageFlightPrice wantedPrice={one.wantedPrice} wish={'round'} wayId={one.roundwayId}/>
                    </div>
                )
            }) : null}
        </div>
    )
}