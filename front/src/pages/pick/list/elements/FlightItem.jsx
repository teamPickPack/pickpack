import styled from "styled-components";

export default function FlightItem({item}){
    return(
        <div style={{display: 'flex'}}>
            {item.waitTime !== "0시간" ? <div id="flight-waiting" style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto 4px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D9D9D9', textAlign: 'center'}}>
                <div style={{fontSize: '8px', fontWeight: 'bold'}}>대기</div>
                <div style={{fontSize: '8px', fontWeight: 'bold', width: '60px'}}>{item.waitTime}</div>
            </div> : null}
            <div id="flight-dep" style={{textAlign: 'center', margin: 'auto 4px'}}>
                <div style={{margin: '8px 0px'}}>
                    <NameText nameLength={item.depName.length} style={{fontWeight: 'bold'}}>{item.depName}</NameText>
                    <div style={{fontSize: '12px'}}>({item.depCode})</div>
                </div>
                <div style={{margin: '8px 0px'}}>
                    <div style={{fontSize: '8px'}}>{item.depDate.replaceAll("-", "/")}</div>
                    <div style={{fontSize: '8px'}}>{item.depTime}</div>
                </div>
            </div>
            <div id="flight-info" style={{position: 'relative',  width: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0px 4px', height: '160px'}}>
                <div style={{position: 'absolute', bottom: '79px', fontSize: '8px', padding: '4px',display: 'block', width: '56px', wordBreak: 'break-all'}}>{item.code} {item.codeshareName === "False"? null : ` Operated by ${item.codeshareName}`}</div>
                <div style={{borderTop:'1px solid black', borderBottom: '1px solid black', position: 'relative', width: '64px'}}>
                    <div style={{position: 'absolute', top: '-5px', right: '0px', borderTop: '2px solid black', borderRight: '2px solid black', width: '8px', height: '8px' , transform: 'rotate(45deg)'}}></div>
                </div>
                <div style={{position: 'absolute', top: '79px', fontSize: '8px', padding: '4px',  width: '56px'}}>{item.flightTime} {item.waypointName === "False"? null : `(중간 경유 ${item.waypointName})`}</div>
            </div>
            <div id="flight-arr" style={{textAlign: 'center', margin: 'auto 4px'}}>
                <div style={{margin: '8px 0px'}}>
                    <NameText nameLength={item.arrName.length} style={{fontWeight: 'bold'}}>{item.arrName}</NameText>
                    <div style={{fontSize: '12px'}}>({item.arrCode})</div>
                </div>
                <div style={{margin: '8px 0px'}}>
                    <div style={{fontSize: '8px'}}>{item.arrDate.replaceAll("-", "/")}</div>
                    <div style={{fontSize: '8px'}}>{item.arrTime}</div>
                </div>
            </div>
        </div>
    )
};

const NameText = styled.div`
    // font-size: ${(props) => props.nameLength > 6 ? 12 : 16}px;
    font-size: ${(props) => {
        if(props.nameLength > 10) return 10;
        else if(props.nameLength > 9) return 11;
        else if(props.nameLength > 8) return 12;
        else if(props.nameLength > 7) return 13;
        else if(props.nameLength > 3) return 14;
        else return 16;
    }
    }px;
`