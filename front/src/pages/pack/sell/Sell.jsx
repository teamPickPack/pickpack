import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { item } from "../../../apis/item";
import ItemController from "../../../components/pack/common/ItemController";
import ItemList from "../../../components/pack/common/ItemList";
import Spinner from "../../../components/pack/common/Spinner";

const Sell = () => {
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const setNewCondition = async (type, text) => {
    setSearchType(type);
    setSearchText(text);
    setPageNum(0);
    setItemList([]);
    setHasNext(true);
  };

  const getItemList = async () => {
    if (!hasNext) return;

    let res;
    if (searchType === "title") {
      res = await item.post.title("SELL", searchText, pageNum);
    } else if (searchType === "tag") {
      res = await item.get.city("SELL", searchText, pageNum);
    } else {
      res = await item.get.category("SELL", pageNum);
    }

    await setPageNum((prev) => prev + 1);
    setHasNext(res.hasNext);
    setItemList((itemList) => {
      return [...itemList, ...res.results];
    });
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(async () => {
      await getItemList();
      setIsLoading(false);
    }, 300);
  }, [searchType, searchText]);

  // ---------------------- 무한 스크롤 부분.. ----------------------------
  const [timer, setTimer] = useState(false);

  const InfinityScroll = () => {
    const totalHeight = document.body.scrollHeight - 100;
    const scrollPoint = window.scrollY + window.innerHeight;

    if ((totalHeight > scrollPoint) | !hasNext | (pageNum === 0)) return;

    if (timer) return;
    setTimer(true);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!timer) return;
    const debounce = setTimeout(async () => {
      await getItemList();
      setTimer(false);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [timer]);

  useEffect(() => {
    window.addEventListener("scroll", InfinityScroll);

    return () => {
      window.removeEventListener("scroll", InfinityScroll);
    };
  }, [getItemList]);
  // ---------------------- 무한 스크롤 부분.. ----------------------------

  return (
    <SellContainer>
      {isLoading && <Spinner />}
      <h1>팔게요</h1>
      <ItemController setNewCondition={setNewCondition} />
      {itemList.length ? (
        <ItemList itemList={itemList} />
      ) : isLoading ? (
        <div />
      ) : (
        <div className="empty-div">등록된 게시물이 없습니다.</div>
      )}
    </SellContainer>
  );
};

const SellContainer = styled.div`
  margin: 36px 70px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 36px;
    color: #000000;
    margin: 0;
    display: flex;
  }

  .empty-div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
  }
`;

export default Sell;
