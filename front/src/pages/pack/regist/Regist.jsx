import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import ImageInput from "../../../components/pack/common/ImageInput";

const TAG_DUMMNY = [
  {
    id: "1",
    cityName: "세부",
  },
  {
    id: "2",
    cityName: "세네갈",
  },
  {
    id: "3",
    cityName: "고릴라",
  },
  {
    id: "4",
    cityName: "헤네시스",
  },
];

const Regist = () => {
  const [images, setImages] = useState([]);
  const [isCategory, setIsCategory] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchTag, setSearchTag] = useState("");

  const categoryRef = useRef();
  const titleRef = useRef();
  const tagRef = useRef();
  const priceRef = useRef();
  const contentRef = useRef();

  // axios
  //   .get("https://j8b307.p.ssafy.io/api/item", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  axios
    .post(
      "https://j8b307.p.ssafy.io/api/item/detail",
      { itemId: 9, memberId: 1 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
    });

  const inputNumBlurHandler = (event) => {
    event.target.value = event.target.value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (event.target.value.length > 0) {
      event.target.value += "원";
    }
  };

  const inputNumFocusHandler = (event) => {
    event.target.value = event.target.value
      .replaceAll(",", "")
      .replaceAll("원", "");
  };
  const inputNumVaild = (event, dotValid) => {
    const data = event.target.value;
    const valid = /^[0-9]$/;

    let result = "";
    let dotChk = false;
    let dotCnt = 0;

    if (+data[0] === 0 || data[0] === ".") {
      event.target.value = null;
      return;
    }

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      if (valid.test(element)) {
        if (dotChk && dotCnt < dotValid) {
          dotCnt++;
        } else if (dotChk) {
          break;
        }
        result += element;
      } else {
        if (dotValid !== 0 && !dotChk && element === ".") {
          result += element;
          dotChk = true;
        } else {
          break;
        }
      }
    }

    event.target.value = result;
  };

  return (
    <RegistContainer>
      <RegistInner>
        <div className="image-box">
          <ImageInput
            setImage={(data) => {
              setImages(data);
            }}
            maxFileNum={10}
            maxFileSize={10}
            isPreview={true}
            addButton={
              <div className="add-button">
                <p className="plus">+</p>
                <p className="image-count">({images.length}/10)</p>
              </div>
            }
          />
        </div>
        <div className="title-box">
          <input type="text" ref={titleRef} placeholder="제 목" />
        </div>
        <div className="category-box">
          <input
            id="category"
            type="text"
            ref={categoryRef}
            placeholder="카테고리"
            onClick={() => {
              setIsCategory(!isCategory);
            }}
            readOnly
          />
          {isCategory && (
            <section>
              <div>
                <label htmlFor="BUY">
                  <input
                    id="BUY"
                    name="category"
                    type="radio"
                    value="BUY"
                    onClick={() => {
                      setIsCategory(!isCategory);
                      categoryRef.current.category = "BUY";
                      categoryRef.current.value = "살게요";
                    }}
                  />
                  살게요
                </label>
              </div>
              <div>
                <label htmlFor="SELL">
                  <input
                    id="SELL"
                    name="category"
                    type="radio"
                    value="SELL"
                    onClick={() => {
                      setIsCategory(!isCategory);
                      categoryRef.current.category = "SELL";
                      categoryRef.current.value = "팔게요";
                    }}
                  />
                  팔게요
                </label>
              </div>
              <div>
                <label htmlFor="BORROW">
                  <input
                    id="BORROW"
                    name="category"
                    type="radio"
                    value="BORROW"
                    onClick={() => {
                      setIsCategory(!isCategory);
                      categoryRef.current.category = "BORROW";
                      categoryRef.current.value = "빌려주세요";
                    }}
                  />
                  빌려주세요
                </label>
              </div>
              <div>
                <label htmlFor="RENT">
                  <input
                    id="RENT"
                    name="category"
                    type="radio"
                    value="RENT"
                    onClick={() => {
                      setIsCategory(!isCategory);
                      categoryRef.current.category = "RENT";
                      categoryRef.current.value = "빌려드려요";
                    }}
                  />
                  빌려드려요
                </label>
              </div>
            </section>
          )}
        </div>
        <div className="tag-box">
          <div className="tag-content">
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
              placeholder="태그 입력"
            />
          </div>
          {searchTag && (
            <section>
              {TAG_DUMMNY.filter((item) => {
                return (
                  searchTag === item.cityName.substring(0, searchTag.length)
                );
              }).map((res) => {
                return (
                  <div
                    key={res.cityName}
                    onClick={() => {
                      tagRef.current.value = "";
                      setSearchTag("");
                      setSelectedTag({
                        id: res.id,
                        cityName: res.cityName,
                      });
                    }}
                  >
                    {res.cityName}
                  </div>
                );
              })}
            </section>
          )}
        </div>
        <div className="price-box">
          <input
            type="text"
            ref={priceRef}
            placeholder="가 격 (원)"
            onBlur={inputNumBlurHandler}
            onFocus={inputNumFocusHandler}
            onChange={(event) => inputNumVaild(event, 0)}
          />
        </div>
        <div className="content-box">
          <textarea ref={contentRef} placeholder="내용을 입력해주세요" />
        </div>
        <div className="button-box">
          <button>완 료</button>
        </div>
      </RegistInner>
    </RegistContainer>
  );
};

const RegistContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const RegistInner = styled.div`
  width: 660px;
  padding: 0 10px;

  .image-box {
    margin: 40px 0;
    height: 180px;

    .add-button {
      box-sizing: border-box;
      width: 180px;
      height: 180px;
      background: #d9d9d9;
      border: none;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .plus {
        font-size: 40px;
        margin: 0;
      }

      .image-count {
        position: absolute;
        margin: 0;
        transform: translate(0, 50px);
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  .title-box {
    display: flex;
    align-items: center;
    height: 64px;
    background: #ffffff;
    border: 2px solid #d9d9d9;
    border-width: 2px 0 2px 0;

    input {
      padding: 16px;
      width: 100%;
      outline: none;
      border: none;
      font-weight: 600;
      font-size: 20px;
      display: flex;
      align-items: center;
      color: #000000;
    }
  }
  .category-box {
    display: flex;
    align-items: center;
    height: 64px;
    background: #ffffff;
    border-bottom: 2px solid #d9d9d9;
    font-weight: 600;
    font-size: 20px;

    input {
      padding: 16px;
      width: 100%;
      outline: none;
      border: none;
      font-weight: 600;
      font-size: 20px;
      display: flex;
      align-items: center;
      color: #000000;
      background: #ffffff;
      cursor: pointer;
    }

    section {
      position: absolute;
      transform: translate(0, 146px);
      width: 656px;
      font-weight: 600;
      font-size: 20px;
      color: #000000;
      background: #ffffff;
      border: 2px solid #d9d9d9;

      > div {
        height: 56px;
        border-bottom: 2px solid #d9d9d9;
        display: flex;
        align-items: center;
        transition: all 0.2s ease;

        input[type="radio"] {
          display: none;
        }

        label {
          text-align: start;
          width: 100%;
          padding: 16px;
          cursor: pointer;
        }

        :hover {
          color: #80489c;
          text-shadow: 0 0 1px #80489c;
        }
      }

      >div: last-child {
        border: none;
      }
    }
  }
  .tag-box {
    padding: 12px 16px;
    height: 56px;
    background: #ffffff;
    border-bottom: 2px solid #d9d9d9;

    .tag-content {
      display: flex;
      height: 24px;

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
      margin-top: 8px;
      width: 100%;

      input {
        width: 100%;
        outline: none;
        border: none;
        font-weight: 600;
        font-size: 20px;
        display: flex;
        align-items: center;
        color: #000000;
      }
    }

    section {
      position: absolute;
      transform: translate(-16px, 8px);
      width: 656px;
      font-weight: 600;
      font-size: 20px;
      color: #000000;
      background: #ffffff;
      border: 2px solid #d9d9d9;

      > div {
        cursor: pointer;
        padding: 0 16px;
        height: 56px;
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

  .price-box {
    display: flex;
    align-items: center;
    padding: 16px;
    height: 32px;
    background: #ffffff;
    border-bottom: 2px solid #d9d9d9;

    input {
      width: 100%;
      outline: none;
      border: none;
      font-weight: 600;
      font-size: 20px;
      display: flex;
      align-items: center;
      letter-spacing: 1px;
      color: #000000;
    }
  }
  .content-box {
    display: flex;
    align-items: center;
    padding: 16px;
    height: 244px;
    background: #ffffff;
    border-bottom: 2px solid #d9d9d9;

    textarea {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      resize: none;
      font-weight: 600;
      font-size: 16px;
      color: #000000;
    }
  }
  .button-box {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      padding: 6px 24px;
      background: #432c7a;
      color: #ffffff;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

export default Regist;
