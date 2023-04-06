import { useState, useEffect } from "react";
import { member } from "../../../apis/member";
import { useSelector } from "react-redux";
import ItemList from "../../../components/pack/common/ItemList";
import styled from "styled-components";
import { item } from "../../../apis/item";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MypageItem({ mypageTab }) {
  const memberId = useSelector((state) => {
    return state.user.memberId;
  });

  const [dealData, setDealData] = useState(null);
  const [rentData, setRentData] = useState(null);
  const [itemData, setItemData] = useState(null);

  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (mypageTab === 1) {
        const response = await member.deal(memberId);
        setDealData(response);
      } else if (mypageTab === 2) {
        const response = await member.rent(memberId);
        setRentData(response);
      } else {
        const response = await member.item(memberId);
        setItemData(response);
      }
    };
    getData();
  }, [mypageTab]);

  console.log(dealData);

  return (
    <WrapperDiv>
      {mypageTab === 1 ? (
        dealData ? (
          <div>
            <HeaderDiv>
              <span>살게요</span>
            </HeaderDiv>
            <MyItemList id="up-list">
              {dealData.buyItemList.length > 0 ? (
                <ItemList itemList={dealData.buyItemList} />
              ) : (
                <EmptyDiv>
                  <span>목록이 없습니다.</span>
                </EmptyDiv>
              )}
              <button
                className="left-arrow"
                onClick={() => {
                  document.getElementById("up-list").scrollBy(-254, 0);
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                className="right-arrow"
                onClick={() => {
                  document.getElementById("up-list").scrollBy(254, 0);
                }}
              >
                <FaChevronRight />
              </button>
            </MyItemList>
            <HeaderDiv>
              <span>팔게요</span>
            </HeaderDiv>
            <MyItemList id="down-list">
              {dealData.sellItemList.length > 0 ? (
                <ItemList itemList={dealData.sellItemList} />
              ) : (
                <EmptyDiv>
                  <span>목록이 없습니다.</span>
                </EmptyDiv>
              )}
              <button
                className="left-arrow"
                onClick={() => {
                  document.getElementById("down-list").scrollBy(-254, 0);
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                className="right-arrow"
                onClick={() => {
                  document.getElementById("down-list").scrollBy(254, 0);
                }}
              >
                <FaChevronRight />
              </button>
            </MyItemList>
          </div>
        ) : null
      ) : mypageTab === 2 ? (
        rentData ? (
          <div>
            <HeaderDiv>
              <span>빌려주세요</span>
            </HeaderDiv>
            <MyItemList id="up-list">
              {rentData.borrowItemList.length > 0 ? (
                <ItemList itemList={rentData.borrowItemList} />
              ) : (
                <EmptyDiv>
                  <span>목록이 없습니다.</span>
                </EmptyDiv>
              )}
              <button
                className="left-arrow"
                onClick={() => {
                  document.getElementById("up-list").scrollBy(-254, 0);
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                className="right-arrow"
                onClick={() => {
                  document.getElementById("up-list").scrollBy(254, 0);
                }}
              >
                <FaChevronRight />
              </button>
            </MyItemList>
            <HeaderDiv>
              <span>빌려드려요</span>
            </HeaderDiv>
            <MyItemList id="down-list">
              {rentData.rentItemList.length > 0 ? (
                <ItemList itemList={rentData.rentItemList} />
              ) : (
                <EmptyDiv>
                  <span>목록이 없습니다.</span>
                </EmptyDiv>
              )}
              <button
                className="left-arrow"
                onClick={() => {
                  document.getElementById("down-list").scrollBy(-254, 0);
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                className="right-arrow"
                onClick={() => {
                  document.getElementById("down-list").scrollBy(254, 0);
                }}
              >
                <FaChevronRight />
              </button>
            </MyItemList>
          </div>
        ) : null
      ) : itemData ? (
        <div>
          <HeaderDiv>
            <span>거래</span>
          </HeaderDiv>
          <MyItemList id="up-list">
            {itemData.buyWishList.length > 0 ? (
              <ItemList itemList={itemData.buyWishList} />
            ) : (
              <EmptyDiv>
                <span>목록이 없습니다.</span>
              </EmptyDiv>
            )}
            <button
              className="left-arrow"
              onClick={() => {
                document.getElementById("up-list").scrollBy(-254, 0);
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              className="right-arrow"
              onClick={() => {
                document.getElementById("up-list").scrollBy(254, 0);
              }}
            >
              <FaChevronRight />
            </button>
          </MyItemList>
          <HeaderDiv>
            <span>대여</span>
          </HeaderDiv>
          <MyItemList id="down-list">
            {itemData.borrowWishList.length > 0 ? (
              <ItemList itemList={itemData.borrowWishList} />
            ) : (
              <EmptyDiv>
                <span>목록이 없습니다.</span>
              </EmptyDiv>
            )}
            <button
              className="left-arrow"
              onClick={() => {
                document.getElementById("down-list").scrollBy(-254, 0);
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              className="right-arrow"
              onClick={() => {
                document.getElementById("down-list").scrollBy(254, 0);
              }}
            >
              <FaChevronRight />
            </button>
          </MyItemList>
        </div>
      ) : null}
    </WrapperDiv>
  );
}

const HeaderDiv = styled.div`
  width: 100%;
  font-size: 28px;
  text-align: left;
  padding-bottom: 12px;
  border-bottom: 1px solid red;

  span {
    margin-left: 40px;
  }
`;

const WrapperDiv = styled.div`
  position: absolute;
  left: 400px;
  right: 80px;
  overflow: scroll;
  max-height: calc(100vh - 204px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-bottom: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MyItemList = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-bottom: 12px;

  ::-webkit-scrollbar {
    display: none;
  }

  ul {
    flex-wrap: nowrap;
    padding-left: 16px;

    li {
      height: 280px;
      margin: 24px 12px 0 0 !important;

      img {
        width: 240px;
        height: 204px;
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    opacity: 0.4;
    border: none;
    cursor: pointer;

    :hover {
      opacity: 1;
    }
  }

  .left-arrow {
    left: 4px;
    transform: translate(0, 120px);
    svg {
      transform: translate(-2px, 0);
      width: 20px;
      height: 20px;
    }
  }

  .right-arrow {
    transform: translate(0, 120px);
    right: 4px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const EmptyDiv = styled.div`
  height: 280px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 24px;
    font-weight: 500;
  }
`;
