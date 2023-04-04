import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiUser, FiHash, FiKey, FiLock } from "react-icons/fi";
import defaultProfile from "../../../../assets/image/defaultProfile.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userAction } from "../../../../store/userSlice";
export const CloseSVG = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1L1 13"
        stroke="#6C6F75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L13 13"
        stroke="#6C6F75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function UserModal({ initialLoginMode, handleUserModalState }) {
  const [loginMode, setLoginMode] = useState(initialLoginMode);

  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleLoginId = (event) => {
    setLoginId(event.target.value);
  };
  const handleLoginPassword = (event) => {
    setLoginPassword(event.target.value);
  };
  const closeModal = () => {
    handleUserModalState("button");
  };
  const [signupId, setSignupId] = useState("");
  const [nickname, setNickname] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordCheck, setSignupPasswordCheck] = useState("");
  const handleSignupId = (event) => {
    setSignupId(event.target.value);
  };
  const handleNickname = (event) => {
    setNickname(event.target.value);
  };
  const handleSignupPassword = (event) => {
    setSignupPassword(event.target.value);
  };
  const handleSignupPasswordCheck = (event) => {
    setSignupPasswordCheck(event.target.value);
  };
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  useEffect(() => {
    if (profileImage !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(profileImage);

      reader.onload = () => {
        setProfileImagePreview({ profileImage, url: reader.result });
      };
    }
  }, [profileImage]);

  const registProfileImage = (event) => {
    if (event.target.files[0] === undefined) return;
    console.log(event.target.files[0].name);
    setProfileImage(event.target.files[0]);
  };

  const dispatch = useDispatch();

  const doLogin = () => {
    const data = {
      mid: loginId,
      pwd: loginPassword,
    };
    console.log(data);
    axios
      .post("https://j8b307.p.ssafy.io/api/member/login", data, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(res);
        dispatch(userAction.setAccessToken(res.headers.getAuthorization()));
        dispatch(userAction.setMemberId(res.data.data.id));
      })
      .catch((err) => console.log(err));
  };

  const doSignup = () => {
    const data = {
      mid: signupId,
      pwd: signupPassword,
      nickname: nickname,
      img_url: ".",
    };
    console.log(data);
    axios
      .post("https://j8b307.p.ssafy.io/api/member/join", data, {
        "Content-Type": "application/json",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <UserModalBox>
      <CloseBox onClick={closeModal}>
        <CloseSVG />
      </CloseBox>
      <br></br>
      <UserModalContent>
        <UserModalContentMode>
          <div onClick={() => setLoginMode(true)}>로그인</div>
          <div onClick={() => setLoginMode(false)}>회원가입</div>
        </UserModalContentMode>
        {loginMode ? (
          <UserModalLogin>
            <TextInputBox>
              <FiUser size={30} />
              <input
                onChange={handleLoginId}
                value={loginId}
                type="text"
                placeholder="아이디"
              />
            </TextInputBox>
            <ErrorMessage className="login-error"></ErrorMessage>
            <TextInputBox>
              <FiKey size={30} />
              <input
                onChange={handleLoginPassword}
                value={loginPassword}
                type="password"
                placeholder="비밀번호"
              />
            </TextInputBox>
            <ErrorMessage className="login-error">
              아이디 또는 비밀번호가 틀렸습니다.
            </ErrorMessage>
            <LoginBtn onClick={doLogin}>
              <span>로그인</span>
            </LoginBtn>
          </UserModalLogin>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                border: "1px solid red",
                padding: "16px 0px 8px 0px",
              }}
            >
              <ImageDiv>
                <label htmlFor="profile-image-input">
                  <ProfileImage
                    src={
                      profileImagePreview
                        ? profileImagePreview.url
                        : defaultProfile
                    }
                    alt="#"
                  />
                </label>
                <ImageLabel>프로필 사진</ImageLabel>
                <input
                  type="file"
                  id="profile-image-input"
                  accept="image/*"
                  onChange={registProfileImage}
                  style={{ display: "none" }}
                />
              </ImageDiv>
              <div style={{ border: "1px solid green" }}>
                <div style={{ display: "flex" }}>
                  <TextInputBox inspect={true}>
                    <FiUser size={30} />
                    <input
                      onChange={handleSignupId}
                      value={signupId}
                      className="with-inspect"
                      type="text"
                      placeholder="아이디"
                      style={{ width: "188px" }}
                    />
                  </TextInputBox>
                  <div
                    style={{
                      height: "32px",
                      border: "1px solid black",
                      padding: "8px 16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "0px 16px 16px 0px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>검사</span>
                  </div>
                </div>
                <ErrorMessage
                  style={{
                    textAlign: "left",
                    height: "8px",
                    margin: "4px 0px 8px 0px",
                  }}
                >
                  아이디는 8자 이상 12자 이하만 가능합니다.
                </ErrorMessage>
                <div style={{ display: "flex" }}>
                  <TextInputBox>
                    <FiHash size={30} />
                    <input
                      onChange={handleNickname}
                      value={nickname}
                      type="text"
                      placeholder="닉네임"
                    />
                  </TextInputBox>
                </div>
                <ErrorMessage
                  style={{
                    textAlign: "left",
                    height: "8px",
                    margin: "4px 0px 8px 0px",
                  }}
                >
                  비밀번호는 8자 이상 12자 이하만 가능합니다.
                </ErrorMessage>
                <div style={{ display: "flex" }}>
                  <TextInputBox>
                    <FiKey size={30} />
                    <input
                      onChange={handleSignupPassword}
                      value={signupPassword}
                      type="password"
                      placeholder="비밀번호"
                    />
                  </TextInputBox>
                </div>
                <ErrorMessage
                  style={{
                    textAlign: "left",
                    height: "8px",
                    margin: "4px 0px 8px 0px",
                  }}
                >
                  비밀번호는 8자 이상 12자 이하만 가능합니다.
                </ErrorMessage>
                <div style={{ display: "flex" }}>
                  <TextInputBox>
                    <FiLock size={30} />
                    <input
                      onChange={handleSignupPasswordCheck}
                      value={signupPasswordCheck}
                      type="password"
                      placeholder="비밀번호 확인"
                    />
                  </TextInputBox>
                </div>
                <ErrorMessage
                  style={{
                    textAlign: "left",
                    height: "8px",
                    margin: "4px 0px 8px 0px",
                  }}
                >
                  비밀번호와 일치하지 않습니다.
                </ErrorMessage>
              </div>
            </div>
            <div
              onClick={doSignup}
              style={{
                margin: "0px auto",
                border: "1px solid black",
                width: "80px",
                fontSize: "16px",
                padding: "12px 16px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <span>회원가입</span>
            </div>
          </div>
        )}
      </UserModalContent>
    </UserModalBox>
  );
}

const UserModalBox = styled.div`
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
  width: 640px;
  height: 480px;
  border: 1px solid white;
  background-color: white;
`;
const UserModalContent = styled.div`
  width: 80%;
  border: 1px solid blue;
  margin: 40px auto;
`;
const UserModalContentMode = styled.div`
  border: 1px solid black;
  display: flex;

  div {
    width: 50%;
    border: 1px solid red;
    font-size: 24px;
    font-weight: bold;
    padding: 8px 0px;
  }
`;
const CloseBox = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;
const UserModalLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 72px 0px;

  .login-error {
    text-align: left;
    height: 8px;
    margin: 8px 0px;
  }
`;
const LoginBtn = styled.div`
  border: 1px solid black;
  width: 80px;
  font-size: 16px;
  padding: 14px 16px;
  border-radius: 8px;
  text-align: center;
  margin-top: 8px;
`;
const TextInputBox = styled.div`
  width: fit-content;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border: 1px solid red;
  border-radius: ${(props) => (props.inspect ? "16px 0px 0px 16px" : "16px")};

  input {
    border: 0px solid white;
    font-size: 24px;
    margin-left: 8px;
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  font-size: 8px;
  color: red;
  padding-left: 16px;
`;

const ImageDiv = styled.div`
  text-align: center;
`;

const ProfileImage = styled.img`
  border: 1px solid black;
  border-radius: 50%;
  width: 96px;
  height: 96px;
  &:hover {
    cursor: pointer;
  }
`;

const ImageLabel = styled.div`
  font-size: 24px;
`;
