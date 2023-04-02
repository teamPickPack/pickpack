import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ItemController = (props) => {
  const [searchType, setSearchType] = useState("title");
  const [isTypeClick, setIsTypeClick] = useState(false);
  const inputText = useRef();
  const menuType = props.menuType; // 살게요 팔게요 빌려요...

  const navigator = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    console.log(e);
    // props로 살게욘지 팔게욘지 등이랑
    //제목인지, 태그검색인지 타입에 따라 api 호출시켜버리면댐
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
                  setSearchType("title");
                  setIsTypeClick(!isTypeClick);
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
                  setSearchType("tag");
                  setIsTypeClick(!isTypeClick);
                }}
              />
              <label htmlFor="search-pack-tag">태그</label>
            </li>
          </ul>
        )}
        <input
          type="text"
          ref={inputText}
          placeholder="제목이나 태그로 검색해주세요"
        />
        <button>
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
      <button
        type="button"
        className="regist-item"
        onClick={() => {
          navigator("/pack/regist");
        }}
      >
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
`;

export default ItemController;
