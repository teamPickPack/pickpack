import { useState, useEffect } from "react";
import styled from "styled-components";

export default function MypageTab({ mypageMode, setMypageTab }) {
  const [tab, setTab] = useState(1);
  useEffect(() => {
    setTab(1);
  }, [mypageMode]);
  return (
    <TabBox>
      {mypageMode === 1 && (
        <Tab order={tab}>
          <span
            onClick={() => {
              setTab(1);
              setMypageTab(1);
            }}
          >
            편도
          </span>
          <span
            onClick={() => {
              setTab(2);
              setMypageTab(2);
            }}
          >
            왕복
          </span>
        </Tab>
      )}
      {mypageMode === 2 && (
        <Tab order={tab}>
          <span
            onClick={() => {
              setTab(1);
              setMypageTab(1);
            }}
          >
            거래
          </span>
          <span
            onClick={() => {
              setTab(2);
              setMypageTab(2);
            }}
          >
            대여
          </span>
          <span
            onClick={() => {
              setTab(3);
              setMypageTab(3);
            }}
          >
            찜
          </span>
        </Tab>
      )}
      {mypageMode === 3 && <></>}
    </TabBox>
  );
}

const TabBox = styled.div`
  // border: 1px solid black;
  // position: relative;
  div {
    &:first-child {
      height: 80px;
      margin-top: 8px;
      padding-left: 40px;
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
    font-size: 28px;
    &:nth-child(${(props) => props.order}) {
      font-weight: bold;
      color: #80489c;
      text-shadow: 0 0 1px #80489c;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.7;
      border-bottom: 1px solid #80489c;
    }
  }
`;
