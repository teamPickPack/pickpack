export default function FlightItem(){
    return(
        <div style={{display: 'flex'}}>
            <div id="flight-waiting" style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto 4px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D9D9D9', textAlign: 'center'}}>
                <div style={{fontSize: '8px', fontWeight: 'bold'}}>대기</div>
                <div style={{fontSize: '8px', fontWeight: 'bold', width: '60px'}}>12시간 50분</div>
            </div>
            <div id="flight-dep" style={{textAlign: 'center', margin: 'auto 4px'}}>
                <div style={{margin: '8px 0px'}}>
                    <div style={{fontSize: '16px', fontWeight: 'bold'}}>인천</div>
                    <div style={{fontSize: '12px'}}>(ICN)</div>
                </div>
                <div style={{margin: '8px 0px'}}>
                    <div style={{fontSize: '8px'}}>2023/12/22</div>
                    <div style={{fontSize: '8px'}}>09:00</div>
                </div>
            </div>
            <div id="flight-info" style={{position: 'relative',  width: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0px 4px'}}>
                <div style={{position: 'absolute', bottom: '79px', fontSize: '8px', padding: '4px',display: 'block', width: '56px', wordBreak: 'break-all'}}>LH4051 Operated by 대한항공</div>
                <div style={{borderTop:'1px solid black', borderBottom: '1px solid black', position: 'relative', width: '64px'}}>
                    <div style={{position: 'absolute', top: '-5px', right: '0px', borderTop: '2px solid black', borderRight: '2px solid black', width: '8px', height: '8px' , transform: 'rotate(45deg)'}}></div>
                </div>
                <div style={{position: 'absolute', top: '79px', fontSize: '8px', padding: '4px',  width: '56px'}}>33시간 30분</div>
            </div>
            <div id="flight-arr" style={{textAlign: 'center', margin: 'auto 4px'}}>
                <div style={{margin: '8px 0px'}}>
                    <div style={{fontSize: '16px', fontWeight: 'bold'}}>프랑크푸르트</div>
                    <div style={{fontSize: '12px'}}>(FRA)</div>
                </div>
                <div style={{margin: '8px 0px'}}>
                    <div style={{fontSize: '8px'}}>2023/12/23</div>
                    <div style={{fontSize: '8px'}}>19:15</div>
                </div>
            </div>
        </div>
    )
}