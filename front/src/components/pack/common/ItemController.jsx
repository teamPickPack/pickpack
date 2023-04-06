import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { item } from "../../../apis/item";
import { packAction } from "../../../store/packSlice";
import store from "../../../store/store";

const ItemController = (props) => {
  const [searchType, setSearchType] = useState("title");
  const [isTypeClick, setIsTypeClick] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const inputText = useRef();
  const tagRef = useRef();

  const navigator = useNavigate();

  useEffect(() => {
    const getTagList = async () => {
      const res = await item.get.tag();
      setTagList(res.results);
    };

    getTagList();
  }, []);

  const searchHandler = async (e) => {
    e.preventDefault();

    if (searchType === "tag" && !inputText.current.value) {
      alert("검색할 도시를 선택해주세요.");
      return;
    }

    props.setNewCondition(searchType, inputText.current.value);
  };

  const navigateRegist = () => {
    if (store.getState().user.memberId === null) {
      alert("로그인 후 이용하실 수 있습니다.");
      return;
    }
    navigator("/pack/regist");
  };

  return (
    <ControlContainer>
      <SearchForm onSubmit={searchHandler}>
        <div onClick={() => setIsTypeClick(!isTypeClick)}>
          {searchType === "title" ? "제목" : "태그"}
          <span>▼</span>
        </div>
        {isTypeClick && (
          <ul>
            <li>
              <input
                id="search-pack-title"
                name="search-pack-type"
                type="radio"
                onChange={() => {
                  inputText.current.value = "";
                  setSearchType("title");
                  setIsTypeClick(!isTypeClick);
                  setSearchTag("");
                  setSelectedTag("");
                }}
              />
              <label htmlFor="search-pack-title">제목</label>
            </li>
            <li>
              <input
                id="search-pack-tag"
                name="search-pack-type"
                type="radio"
                onChange={() => {
                  inputText.current.value = "";
                  setSearchType("tag");
                  setIsTypeClick(!isTypeClick);
                }}
              />
              <label htmlFor="search-pack-tag">태그</label>
            </li>
          </ul>
        )}
        {searchType === "title" ? (
          <input
            type="text"
            ref={inputText}
            placeholder="제목을 입력해주세요"
          />
        ) : (
          <>
            <div className="tag-content" ref={inputText}>
              {selectedTag.cityName && <p>{selectedTag.cityName}</p>}
            </div>
            <div className="search-tag">
              <input
                type="text"
                ref={tagRef}
                onChange={(e) => {
                  setSearchTag(e.target.value);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    tagRef.current.value = "";
                    setSearchTag("");
                  }, 100);
                }}
                placeholder="도시명을 입력해주세요"
              />
            </div>
            {searchTag && (
              <section>
                {tagList
                  .filter((item) => {
                    return (
                      searchTag === item.cityName.substring(0, searchTag.length)
                    );
                  })
                  .map((res) => {
                    return (
                      <div
                        key={res.cityName}
                        style={{ zIndex: 10 }}
                        onClick={() => {
                          tagRef.current.value = "";
                          setSearchTag("");
                          setSelectedTag({
                            id: res.id,
                            cityName: res.cityName,
                          });
                          inputText.current.value = res.id;
                        }}
                      >
                        {res.cityName}
                      </div>
                    );
                  })}
              </section>
            )}
          </>
        )}
        <button onClick={searchHandler}>
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.60214 12.1594C6.22509 12.1594 4.87896 11.8028 3.73399 11.1347C2.58901 10.4667 1.69661 9.51719 1.16964 8.40627C0.642665 7.29536 0.504785 6.07294 0.773434 4.89359C1.04208 3.71425 1.7052 2.63096 2.67892 1.7807C3.65264 0.930441 4.89323 0.351408 6.24382 0.116822C7.59441 -0.117764 8.99434 0.00263424 10.2666 0.462791C11.5388 0.922947 12.6262 1.70219 13.3912 2.70199C14.1563 3.70179 14.5646 4.87723 14.5646 6.07968C14.5627 7.69158 13.8285 9.23697 12.5232 10.3768C11.2179 11.5166 9.4481 12.1576 7.60214 12.1594ZM7.60214 1.15936C6.48768 1.15936 5.39826 1.44793 4.47162 1.98858C3.54499 2.52924 2.82276 3.29768 2.39628 4.19676C1.9698 5.09583 1.85821 6.08514 2.07563 7.03959C2.29305 7.99403 2.82971 8.87075 3.61775 9.55887C4.40578 10.247 5.4098 10.7156 6.50285 10.9055C7.59589 11.0953 8.72885 10.9979 9.75847 10.6255C10.7881 10.2531 11.6681 9.6224 12.2873 8.81326C12.9064 8.00412 13.2369 7.05283 13.2369 6.07968C13.2352 4.77518 12.641 3.52454 11.5847 2.60212C10.5283 1.6797 9.09606 1.16083 7.60214 1.15936Z"
              fill="#626262"
            />
            <path
              d="M17.8956 16.0008C17.8084 16.0009 17.722 15.986 17.6415 15.9569C17.5609 15.9277 17.4877 15.885 17.4261 15.8311L11.3829 10.5542C11.2584 10.4454 11.1885 10.298 11.1885 10.1442C11.1885 9.99045 11.2584 9.84299 11.3829 9.73426C11.5075 9.62553 11.6763 9.56445 11.8524 9.56445C12.0285 9.56445 12.1974 9.62553 12.3219 9.73426L18.3651 15.0112C18.4579 15.0923 18.5212 15.1956 18.5468 15.308C18.5724 15.4205 18.5593 15.5371 18.509 15.643C18.4588 15.7489 18.3737 15.8395 18.2645 15.9032C18.1553 15.9669 18.0269 16.0008 17.8956 16.0008Z"
              fill="#626262"
            />
          </svg>
        </button>
      </SearchForm>
      <button type="button" className="regist-item" onClick={navigateRegist}>
        글쓰기
      </button>
    </ControlContainer>
  );
};

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 28px;

  .regist-item {
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    box-sizing: border-box;
    width: 88px;
    height: 34px;
    background: #432c7a;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    :hover {
      opacity: 0.8;
    }
  }
`;

const SearchForm = styled.form`
  border: 1px solid #626262;
  border-radius: 4px;

  > div {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 72px;
    height: 34px;
    background: #ffffff;
    border: 1px solid #626262;
    border-width: 0 1px 0 0;
    border-radius: 8px 0px 0px 8px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    padding-right: 8px;

    > span {
      font-size: 10px;
      position: absolute;
      transform: translate(30px, 0);
    }
  }

  ul {
    position: absolute;
    width: 80px;
    border: 1px solid #626262;
    padding: 0;
    border-radius: 4px;
    transform: translate(-1px, -16px);
    transition: all 0.2s ease;
    background: #ffffff;

    li {
      display: block;
      border-radius: 0 0 4px 4px;

      label {
        font-weight: 700;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 32px;
      }

      :hover {
        background: #f4f4f4;
      }
    }

    li: first-child {
      border-width: 0 0 1px 0;
      border-color: #626262;
      border-style: solid;
      border-radius: 4px 4px 0 0;
    }
  }

  input[type="radio"] {
    display: none;
  }

  input[type="text"] {
    font-weight: 700;
    font-size: 16px;
    width: 324px;
    outline: none;
    border: none;
    padding: 0 12px;
  }

  button {
    background: none;
    border: none;
    padding: 0 8px 0 0;
    cursor: pointer;
    transform: translate(0, 1px);

    :hover {
      path {
        fill: #d9d9d9;
      }
    }
  }

.tag-content {
      z-index:-1;
      width:200px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      text-align:center;
      position:absolute;
      background:none;
      border:none;
      height: 24px;
      cursor:default;
      transform:translate(200px, -29px);

      p {
        margin: 0;
        height: 18px;
        font-size: 14px;
        font-weight: 700;
        padding: 4px 8px;
        background: #ff8fb1;
        border-radius: 8px;
        letter-spacing: 1px;
        color: white;
      }
    }
    
  .search-tag {
      width: 324px;
      border:none;
      background:transparent;

      input {
        font-weight: 700;
        font-size: 16px;
        outline: none;
        border: none;
        padding: 0 12px;
        width: 100%;
        background:transparent;
      }
    }

    section {
      position: absolute;
      transform: translate(80px, 0);
      width: 354px;
      font-weight: 600;
      font-size: 16px;
      color: #000000;
      background: #ffffff;
      border: 2px solid #d9d9d9;

      > div {
        cursor: pointer;
        padding: 0 16px;
        height: 32px;
        border-bottom: 2px solid #d9d9d9;
        display: flex;
        align-items: center;
        transition: all 0.2s ease;

        :hover {
          color: #ff8fb1;
          text-shadow: 0 0 1px #ff8fb1;
        }
      }

      >div: last-child {
        border: none;
      }
    }
  }
`;

export default ItemController;
