import { useState } from "react";
import styled from "styled-components";
import ImageInput from "../../../components/pack/common/ImageInput";

const Regist = () => {
  const [images, setImages] = useState([]);

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
      </RegistInner>
    </RegistContainer>
  );
};

const RegistContainer = styled.div`
  display: flex;
  justify-content: center;
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
`;

export default Regist;
