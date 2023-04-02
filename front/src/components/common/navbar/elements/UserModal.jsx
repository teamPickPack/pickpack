import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { FiUser, FiHash, FiKey, FiLock } from "react-icons/fi";
import defaultProfile from '../../../../assets/image/defaultProfile.png';
import axios from 'axios';
import { member } from '../../../../apis/member';

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

export default function UserModal({initialLoginMode, handleUserModalState}) {
    //공통
    const closeModal = () => {
        handleUserModalState('button');
    }
    const [loginMode, setLoginMode] = useState(initialLoginMode); //현재 로그인인지 회원가입인지
    //로그인
    const [loginId, setLoginId] = useState(''); //아이디
    const loginIdInput = useRef();
    const [loginPassword, setLoginPassword] = useState(''); //비밀번호
    const loginPasswordInput = useRef();
    const [loginErrMsg, setLoginErrMsg] = useState('');
    const handleLoginId = (event) => { //아이디 작성
        setLoginId(event.target.value);
    }
    const handleLoginPassword = (event) => { //비밀번호 작성
        setLoginPassword(event.target.value);
    }
    const doLogin = async () => { //로그인 시도
        if(loginId.trim().length === 0) {
            alert('아이디를 입력하세요.');
            loginIdInput.current.focus();
            return;
        }
        if(loginPassword.trim().length === 0) {
            alert('비밀번호를 입력하세요.');
            loginPasswordInput.current.focus();
            return;
        }
        const data = {
            mid: loginId,
            password: loginPassword,
        }
        console.log(data);
        const response = await member.login(data);
        console.log(response);
        //성공시 errMsg 초기화 + 로그인 처리
        //실패시 : input 비우고, errMsg 아이디 또는 비밀번호가 틀렸습니다.
    }
    
    //회원가입
    const [signupId, setSignupId] = useState('');
    const signupIdInput = useRef();
    const [signupIdErrMsg, setSignupIdErrMsg] = useState('');
    const [nickname, setNickname] = useState('');
    const nicknameInput = useRef();
    const [signupPassword, setSignupPassword] = useState('');
    const signupPasswordInput = useRef();
    const [signupPasswordCheck, setSignupPasswordCheck] = useState('');
    const signupPasswordCheckInput = useRef();
    const handleSignupId = (event) => {
        setSignupId(event.target.value);
        if(event.target.value.trim().length > 12 || event.target.value.trim().length < 4) {
            setSignupIdErrMsg('아이디는 8자 이상 12자 이하만 가능합니다.');
        }
        else{
            setSignupIdErrMsg('');
        }
    }
    const handleNickname = (event) => {
        setNickname(event.target.value);
    }
    const handleSignupPassword = (event) => {
        setSignupPassword(event.target.value);
    }
    const handleSignupPasswordCheck = (event) => {
        setSignupPasswordCheck(event.target.value);
    }
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
    
    const [signupIdChecked, setSignupIdChecked] = useState(false);
    const checkId = async () => {
        if(signupId.trim().length === 0){
            alert('아이디를 입력하세요.');
            signupIdInput.current.focus();
            return;
        }
        const data = {
            mid: signupId
        };

        const response = await member.checkId(data);
        console.log(response);

        //성공 시, 아이디 중복 성공 alert 후 해당 input disabled로 잠금
        //실패 시, 실패 alert
    }
    const registProfileImage = (event) => {
        if(event.target.files[0] === undefined) return;
        console.log(event.target.files[0].name);
        setProfileImage(event.target.files[0]);
    }

    const doSignup = () => {
        const data = {
            mid: signupId,
            password: signupPassword,
            nickname: nickname,
            img_url: '.',
        }
        console.log(data);
        axios.post('https://j8b307.p.ssafy.io/api/member/join', data, {
            'Content-Type' : 'application/json',
        }).then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    return(
        <UserModalBox>
            <CloseBox onClick={closeModal}>
                <CloseSVG />
            </CloseBox>
            <br></br>
            <UserModalContent>
                <UserModalContentMode>
                    <div className={loginMode? 'on' : 'off'} onClick={() => setLoginMode(true)}>로그인</div>
                    <div className={loginMode? 'off' : 'on'} onClick={() => setLoginMode(false)}>회원가입</div>
                </UserModalContentMode>
                {loginMode ? <UserModalLogin>
                    <TextInputBox>
                        <FiUser size={30} />
                        <input ref={loginIdInput} onChange={handleLoginId} value={loginId} type='text' placeholder="아이디" />
                    </TextInputBox>
                    <ErrorMessage className="login-error"></ErrorMessage>
                    <TextInputBox>
                        <FiKey size={30}/>
                        <input ref={loginPasswordInput} onChange={handleLoginPassword} value={loginPassword} type='password' placeholder="비밀번호" />
                    </TextInputBox>
                    <ErrorMessage className="login-error">{loginErrMsg}</ErrorMessage>
                    <LoginBtn onClick={doLogin}>
                        <span>로그인</span>
                    </LoginBtn>
                </UserModalLogin> : <div>
                    <UserModalSignupContent>
                        <div>
                            <SignupId>
                                <TextInputBox inspect={true}>
                                    <FiUser size={30} />
                                    <input ref={signupIdInput} onChange={handleSignupId} value={signupId} className="with-inspect" type='text' placeholder="아이디" style={{width: '194px'}}/>
                                </TextInputBox>
                                <IdCheckBtn onClick={checkId}>
                                    <span>검사</span>
                                </IdCheckBtn>
                            </SignupId>
                            <ErrorMessage style={{textAlign: 'left', height: '8px', marginBottom: '10px'}}>{signupIdErrMsg}</ErrorMessage>
                            <div style={{display: 'flex'}}>
                                <TextInputBox>
                                    <FiHash size={30} />
                                    <input onChange={handleNickname} value={nickname} type='text' placeholder="닉네임"/>
                                </TextInputBox>
                            </div>
                            <ErrorMessage style={{textAlign: 'left', height: '8px', marginBottom: '10px'}}>비밀번호는 8자 이상 12자 이하만 가능합니다.</ErrorMessage>
                            <div style={{display: 'flex'}}>
                                <TextInputBox>
                                    <FiKey size={30} />
                                    <input onChange={handleSignupPassword} value={signupPassword} type='password' placeholder="비밀번호" />
                                </TextInputBox>
                            </div>
                            <ErrorMessage style={{textAlign: 'left', height: '8px', marginBottom: '10px'}}>비밀번호는 8자 이상 12자 이하만 가능합니다.</ErrorMessage>
                            <div style={{display: 'flex'}}>
                                <TextInputBox>
                                    <FiLock size={30} />
                                    <input onChange={handleSignupPasswordCheck} value={signupPasswordCheck} type='password' placeholder="비밀번호 확인" />
                                </TextInputBox>
                            </div>
                            <ErrorMessage style={{textAlign: 'left', height: '8px', marginBottom: '10px'}}>비밀번호와 일치하지 않습니다.</ErrorMessage>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid black', height: '100%'}}>
                            <ImageDiv>
                                <label htmlFor="profile-image-input">
                                    <ProfileImage src={profileImagePreview? profileImagePreview.url : defaultProfile} alt="#" />
                                </label>
                                <ImageLabel>프로필 사진</ImageLabel>
                                <input type="file" id="profile-image-input" accept="image/*" onChange={registProfileImage} style={{ display: 'none' }} />
                            </ImageDiv>
                            <div onClick={doSignup} style={{ margin: '0px auto', marginTop: '40px', border: '1px solid black', width: '80px', fontSize: '16px', padding: '8px 16px', borderRadius: '8px', textAlign: 'center'}}>
                                <span>회원가입</span>
                            </div>
                        </div>
                    </UserModalSignupContent>
                </div> }
            </UserModalContent>
        </UserModalBox>
    )
}

const UserModalBox = styled.div`
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20000;
    width: 640px;
    height: 560px;
    border: 1px solid white;
    background-color: white;
`;
const UserModalContent = styled.div`
    width: 80%;
    border: 2px solid black;
    margin: 40px auto;
`;
const UserModalContentMode = styled.div`
    border-bottom: 2px solid black;
    display: flex;
    div {
        width: 50%;
        font-size: 24px;
        font-weight: bold;
        padding: 8px 0px;
    }

    div:hover {
        cursor: pointer;
    }
    .on {
        background: #432c7a;
        color: white;
    }

    .off:hover{
        background: #432c7a;
        color: white;
        opacity: .3;
    }
    
`
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

    &:hover{
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
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 8px;
    text-align: center;
    margin-top: 16px;
    background-color: #FF8F81;
    
    &:hover{
        color: white;
        opacity: .7;
        cursor: pointer;
    }
`
const TextInputBox = styled.div`
    width: fit-content;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    border: 1px solid #80489C;
    border-radius: ${(props) => props.inspect? '16px 0px 0px 16px' : '16px'};

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
    opacity: .7;
  }
`;

const ImageLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const UserModalSignupContent = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid red;
    padding: 16px 0px 8px 0px;
`;

const SignupId = styled.div`
    display: flex;
`;

const IdCheckBtn = styled.div`
    height: 32px;
    border: 1px solid #80489C;
    padding: 10.2px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 16px 16px 0px;
    font-size: 18px;
    font-weight: bold;

    &:hover{
        cursor: pointer;
        color: white;
        background-color: #80489C;
    }
`