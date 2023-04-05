/**
 * 이미지 업로드 및 미리보기 컴포넌트
 *
 * prop
 *  - setImage(), 부모 컴포넌트에 image 데이터 설정하는 함수
 *  - maxFileNum, 등록 가능한 최대 파일 수 ( 설정안했을 시 -> 기본 1개 )
 *  - maxFileSize, 등록 가능한 파일 최대 크기( 설정안했을 시 -> 기본 5MB )
 *  - isPreview, 이미지 미리보기 여부 ( true 일 때 미리보기 )
 *  - addButton : 사진 등록 버튼 ( 기본 : 사진 업로드하기 (텍스트) )
 *  - delButton : 사진 삭제 버튼 ( isPreview 설정안했을 때 삭제하기 위해 생성 )
 *  - loadedImages : 백엔드에서 이미지 불러와서 사용할 용도
 *  - setLoadedImages : 부모 컴포넌트에 loadedImage 데이터 설정 함수
 */

import { useEffect, useState } from "react";
import styled from "styled-components";

const ImageInput = (props) => {
  const [imagePreviewState, setImagePreviewState] = useState([]);
  const [imageState, setImageState] = useState([]);
  const [loadedImages, setLoadedImages] = useState(props.loadedImages);
  const [emptyImage, setEmptyImage] = useState([]);

  console.log(loadedImages, props.loadedImages);

  const ImageChangeEventHandler = async (data) => {
    const images = [...data.target.files];
    data.target.value = "";

    if (props.maxFileNum === 1 || !props.maxFileNum) {
      if (!images[0].type.includes("image")) {
        alert(
          "등록하실 사진을 확인해주세요!\n이미지 형식의 파일만 등록이 가능합니다."
        );
        return;
      }

      if (
        images[0].size >
        (!props.maxFileSize ? 5 : props.maxFileSize) * 1024 * 1024
      ) {
        alert(
          `등록이 가능한 사진의 최대 크기는 ${
            !props.maxFileSize ? 5 : props.maxFileSize
          }MB입니다.\n업로드 파일의 크기를 확인바랍니다.`
        );
        return;
      }

      setImageState([images[0]]);
      props.setImage(images[0]);
      return;
    }

    const removeDupl = [...imageState, ...images];

    const nonDuplImages = removeDupl.filter((item) => {
      let idx;

      for (let i = 0; i < removeDupl.length; i++) {
        if (item.name === removeDupl[i].name) {
          idx = i;
        }
      }

      return idx === removeDupl.indexOf(item);
    });

    if (
      nonDuplImages.length + (!loadedImages ? 0 : loadedImages.length) >
      props.maxFileNum
    ) {
      alert(`이미지 등록은 최대 ${props.maxFileNum}개까지만 가능합니다.`);
      return;
    }

    let imageTypeValid = false;
    let imageSizeValid = false;

    nonDuplImages.forEach((image) => {
      if (!image.type.includes("image")) {
        imageTypeValid = true;
      }

      if (
        image.size >
        (!props.maxFileSize ? 5 : props.maxFileSize) * 1024 * 1024
      ) {
        imageSizeValid = true;
      }
    });

    if (imageTypeValid) {
      alert(
        "등록하실 사진을 확인해주세요!\n이미지 형식의 파일만 등록이 가능합니다."
      );
      return;
    }

    if (imageSizeValid) {
      alert(
        `등록이 가능한 사진의 최대 크기는 1장당 ${
          !props.maxFileSize ? 5 : props.maxFileSize
        }MB입니다.\n업로드 파일의 크기를 확인바랍니다.`
      );
      return;
    }

    setImageData([...nonDuplImages]);
  };

  const imageRemoveEventHandler = (event) => {
    const targetName = event.target.value;

    const resultSet = imageState.filter((image) => {
      return image.name !== targetName;
    });

    setImageData([...resultSet]);
  };

  const loadedImageRemoveHandler = (event) => {
    const targetNo = event.target.value;

    const resultSet = loadedImages.filter((image) => {
      console.log(image, targetNo);
      return image !== targetNo;
    });

    setLoadedData([...resultSet]);
  };

  const setImageData = (data) => {
    setImageState(data);
    props.setImage(data);
  };

  const setLoadedData = (data) => {
    setLoadedImages(data);
    props.setLoadedImages(data);
  };

  useEffect(() => {
    if (!props.isPreview) {
      return;
    }
    let imagePreview = [];

    if (imageState.length === 0) {
      setImagePreviewState([]);
      return;
    }

    imageState.forEach((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = () => {
        imagePreview = [...imagePreview, { image, url: reader.result }];

        setImagePreviewState([...imagePreview]);
      };
    });
  }, [imageState, props.isPreview]);

  const removeAllHandler = () => {
    setImageData();
  };

  useEffect(() => {
    let empty = [];

    for (
      let index = 0;
      index <
      props.maxFileNum -
        imageState.length -
        (loadedImages ? loadedImages.length : 0);
      index++
    ) {
      empty.push(index);
    }

    setEmptyImage([...empty]);
  }, [imageState, loadedImages]);

  console.log(loadedImages, imageState);

  return (
    <ImageInputContainer>
      <InputBox>
        <input
          type="file"
          id="Image"
          accept="image/*"
          multiple={props.maxFileNum === 1 || !props.maxFileNum ? false : true}
          onChange={ImageChangeEventHandler}
          style={{ display: "none" }}
        />
        <label htmlFor="Image" style={{ display: "flex" }}>
          {props.addButton ? props.addButton : <p>사진 업로드하기</p>}
        </label>
      </InputBox>
      {props.delButton && (
        <div onClick={removeAllHandler}>{props.delButton}</div>
      )}
      {props.isPreview && (
        <div className="preview-container">
          {imagePreviewState.map((data) => {
            const image = data.image;
            const imageURL = data.url;
            console.log(imagePreviewState.length);
            return (
              <ImagePreview key={image.name}>
                <img src={imageURL} alt={image.name} id={image.name} />
                <button
                  type="button"
                  onClick={imageRemoveEventHandler}
                  value={image.name}
                >
                  ✖
                </button>
              </ImagePreview>
            );
          })}
          {loadedImages &&
            loadedImages.map((data, idx) => {
              return (
                <ImagePreview key={idx}>
                  <img src={data} alt={idx} id={data} />
                  <button
                    type="button"
                    onClick={loadedImageRemoveHandler}
                    value={data}
                  >
                    ✖
                  </button>
                </ImagePreview>
              );
            })}
          {emptyImage.map((i) => {
            return <EmptyPreview key={i} />;
          })}
        </div>
      )}
    </ImageInputContainer>
  );
};

const EmptyPreview = styled.div`
  width: 84px;
  height: 84px;
  background: #d9d9d9;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 12px;
`;

const ImageInputContainer = styled.div`
  display: flex;

  .preview-container {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
`;

const InputBox = styled.div``;

const ImagePreview = styled.div`
  width: 84px;
  height: 84px;
  background: #fafafa;
  border: none;
  border-radius: 4px;
  display: flex;
  position: relative;
  margin-left: 12px;

  img {
    width: 84px;
    height: 84px;
    border-radius: 4px;
  }

  button {
    width: 16px;
    height: 16px;
    position: absolute;
    border: none;
    background: transparent;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 10px;
    right: 1px;
  }

  button:hover {
    font-size: 16px;
    width: 20px;
    color: red;
  }
`;

export default ImageInput;
