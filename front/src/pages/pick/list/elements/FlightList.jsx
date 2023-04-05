import {useState, useRef, useEffect} from 'react';
import FlightItem from "./FlightItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

export default function FlightList({data}){
    const FlightDetailAllItemRef = useRef();
    // console.log(data);
    const [scrollLeftButtonVisible, setScrollLeftButtonVisible] = useState(false)
    const [scrollRightButtonVisible, setScrollRightButtonVisible] = useState(false)
    useEffect(() => {
        if(FlightDetailAllItemRef.current.offsetWidth < FlightDetailAllItemRef.current.scrollWidth){
            setScrollRightButtonVisible(true);
        }
    }, [FlightDetailAllItemRef])
    const handleHorizontalScroll = (nextType) => {
        if (!FlightDetailAllItemRef.current) return;
        if (nextType === 'prev') {
            const nextScrollLeft = FlightDetailAllItemRef.current.scrollLeft - FlightDetailAllItemRef.current.offsetWidth;
            if(nextScrollLeft < 0){
                setScrollLeftButtonVisible(false);
            }
            if(nextScrollLeft < FlightDetailAllItemRef.current.offsetWidth){
                setScrollRightButtonVisible(true)
            }
            FlightDetailAllItemRef.current.scrollTo({
                left: nextScrollLeft,
                behavior: 'smooth',
            });
        } else {
            const nextScrollLeft = FlightDetailAllItemRef.current.scrollLeft + FlightDetailAllItemRef.current.offsetWidth;
            if(nextScrollLeft > 0){
                setScrollLeftButtonVisible(true);
            }
            if(nextScrollLeft + 480 > FlightDetailAllItemRef.current.scrollWidth){
                setScrollRightButtonVisible(false);
            }
            FlightDetailAllItemRef.current.scrollTo({
                left: FlightDetailAllItemRef.current.scrollLeft + FlightDetailAllItemRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    }
    return(
            <FlightDetailAllItem centerAlign={!scrollLeftButtonVisible && !scrollRightButtonVisible} ref={FlightDetailAllItemRef}>
                {data.map((item) => <FlightItem key={item.id} item={item} />)}
                {/* <FlightItem/>
                <FlightItem/>
                <FlightItem/>
                <FlightItem/>
                <FlightItem/> */}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {scrollLeftButtonVisible? <ScrollLeftButton className="scroll-button" onClick={() => handleHorizontalScroll('prev')}><FaChevronLeft size={20}/></ScrollLeftButton> : null}
                    {scrollRightButtonVisible? <ScrollRightButton className="scroll-button" onClick={() => handleHorizontalScroll('next')}><FaChevronRight size={20}/></ScrollRightButton> : null}
                </div>
            </FlightDetailAllItem>
    )
}

const FlightDetailAllItem = styled.div`
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    justify-content: ${(props) => props.centerAlign? 'center' : 'none'};
    padding: 0px 8px;
    .scroll-button{
        position: absolute;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: .5;
    }
    .scroll-button:hover{
        opacity: 1;
        cursor: pointer;
        background-color: #A8AAC4;
        color: white;
    }
`
const ScrollLeftButton = styled.div`
    left: 8px;
`

const ScrollRightButton = styled.div`
    right: 8px;
`