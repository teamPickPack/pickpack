import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getItemList } from "../../../api/pack/pack";
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

const Buy = () => {
  const [itemList, setItemList] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxpage] = useState("");

  useEffect(() => {
    const request = {
      category: "BUY",
      page: page,
    };

    getItemList(request);

    setPage(() => {
      return page + 1;
    });
  }, []);

  console.log(page);

  return (
    <BuyContainer>
      <h1>살게요</h1>
      <ItemController menuType />
      <ItemList itemList={DUMMY_DATA} />
    </BuyContainer>
  );
};

const BuyContainer = styled.div`
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

export default Buy;
