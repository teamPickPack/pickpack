import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ItemController from "../../../components/pack/common/ItemController";
import ItemList from "../../../components/pack/common/ItemList";

const DUMMY_DATA = [
  {
    itemId: 10,
    memberId: 2,
    title: "태 극 기 1 1 1 1   1        1",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑사진찍으실분구합니다",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "블라디보스토크",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-31 14:02",
    isComplete: false,
    cityId: 44,
    cityName: "세부",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태 극 기 1 1 1 1   1        1",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑사진찍으실분구합니다",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "블라디보스토크",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-31 14:02",
    isComplete: false,
    cityId: 44,
    cityName: "세부",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태 극 기 1 1 1 1   1        1",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑사진찍으실분구합니다",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "블라디보스토크",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-31 14:02",
    isComplete: false,
    cityId: 44,
    cityName: "세부",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태 극 기 1 1 1 1   1        1",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑사진찍으실분구합니다",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "블라디보스토크",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-31 14:02",
    isComplete: false,
    cityId: 44,
    cityName: "세부",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태 극 기 1 1 1 1   1        1",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑사진찍으실분구합니다",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "쿠스코",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-23 10:55",
    isComplete: false,
    cityId: 44,
    cityName: "블라디보스토크",
  },
  {
    itemId: 10,
    memberId: 2,
    title: "태극기랑 사진 찍으실 분",
    category: "SELL",
    price: 15000,
    itemName: "태극기",
    imgUrl:
      "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
    registDate: "2023-03-31 14:02",
    isComplete: false,
    cityId: 44,
    cityName: "세부",
  },
];

const Borrow = () => {
  const [itemList, setItemList] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxpage] = useState("");

  window.onscroll = function () {
    if (loading) return;
    const totalPageHeight = document.body.scrollHeight - 200;
    const scrollPoint = window.scrollY + window.innerHeight;

    if (scrollPoint >= totalPageHeight) {
      setLoading(true);
      console.log("API 호출중...");
      console.log("현재 가져온 아이템 개수: " + page);
      if (page === maxPage) return;
      else if (page + 10 > maxPage) setPage(maxPage);
      else setPage((page) => page + 10);
      setTimeout(() => {
        console.log("호출 완료");
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <BorrowContainer>
      <h1>빌려주세요</h1>
      <ItemController menuType />
      <ItemList itemList={DUMMY_DATA} />
    </BorrowContainer>
  );
};

const BorrowContainer = styled.div`
  margin: 36px 70px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 36px;
    color: #000000;
    margin: 0;
    display: flex;
  }
`;

export default Borrow;
