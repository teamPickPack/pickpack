import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { sha256 } from 'js-sha256';
import AWS from 'aws-sdk';
import { FiUser, FiHash, FiKey, FiLock } from "react-icons/fi";
import defaultProfile from '../../../../assets/image/defaultProfile.png';
import { member } from '../../../../apis/member';
import { userAction } from '../../../../store/userSlice';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();
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
        try{
            const response = await member.login(data);
            // console.log(response);
            setLoginErrMsg('');
            dispatch(userAction.setAccessToken(response.headers.authorization));
            handleUserModalState('button');
        } catch{
            setLoginId('');
            setLoginPassword('');
            setLoginErrMsg('아이디 또는 비밀번호가 틀렸습니다.');
        }
        //성공시 errMsg 초기화 + 로그인 처리 + 모달 닫기
        //실패시 : input 비우고, errMsg 아이디 또는 비밀번호가 틀렸습니다.
    }
    
    //회원가입
    const [signupId, setSignupId] = useState('');
    const signupIdInput = useRef();
    const [signupIdErrMsg, setSignupIdErrMsg] = useState('');
    const [nickname, setNickname] = useState('');
    const nicknameInput = useRef();
    const [nicknameErrMsg, setNicknameErrMsg] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const signupPasswordInput = useRef();
    const [signupPasswordErrMsg, setSignupPasswordErrMsg] = useState('');
    const [signupPasswordCheck, setSignupPasswordCheck] = useState('');
    const signupPasswordCheckInput = useRef();
    const [signupPasswordCheckErrMsg, setSignupPasswordCheckErrMsg] = useState('');
    const handleSignupId = (event) => {
        setSignupId(event.target.value.trim());
        if(event.target.value.trim().length > 12 || event.target.value.trim().length < 8) {
            setSignupIdErrMsg('아이디는 8자 이상 12자 이하만 가능합니다.');
        }
        else{
            setSignupIdErrMsg('');
        }
    }
    const handleNickname = (event) => {
        setNickname(event.target.value.trim());
        if(event.target.value.trim().length < 3 || event.target.value.trim().length > 8) {
            setNicknameErrMsg('닉네임은 3자 이상 8자 이하만 가능합니다.');
        } else{
            setNicknameErrMsg('');
        }
    }
    const handleSignupPassword = (event) => {
        setSignupPassword(event.target.value.trim());
        if(event.target.value.trim().length > 12 || event.target.value.trim().length < 8) {
            setSignupPasswordErrMsg('비밀번호는 8자 이상 12자 이하만 가능합니다.');
        }
        else{
            setSignupPasswordErrMsg('');
        }
    }
    const handleSignupPasswordCheck = (event) => {
        setSignupPasswordCheck(event.target.value.trim());
    }
    useEffect(() => {
        if(signupPassword !== signupPasswordCheck){
            setSignupPasswordCheckErrMsg('비밀번호와 일치하지 않습니다.');
        }
        else{
            setSignupPasswordCheckErrMsg('');
        }
    }, [signupPassword, signupPasswordCheck])
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('default.png'); //디폴트 이미지 주소로 설정;
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    useEffect(() => {
        if (profileImage !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(profileImage);
            reader.onload = () => {
                setProfileImagePreview({ profileImage, url: reader.result });
            };
            const originName = profileImage.name;
            const date = new Date();
            const extensionName = `.${originName.split('.').pop()}`;
            const hashImageName = sha256(
            `${date.toString()}${originName}`,
        );
            setProfileImageUrl(hashImageName + extensionName);
        }
    }, [profileImage]);
    
    const registProfileImage = (event) => {
        if(event.target.files[0] === undefined) return;
        setProfileImage(event.target.files[0]);
    }
    // 이미지 S3 전송 함수
    const sendImageToS3 = async (image) => {
        if(image === null) {
            return;
        }
        AWS.config.update({
            region: process.env.REACT_APP_AWS_REGION,
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        });
        
        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: `${process.env.REACT_APP_AWS_BUCKET}/member`,
                Key: profileImageUrl, // 고유한 파일명(현재 날짜 + 유저아이디 + 파일명을 합쳐 해시값 생성)
                Body: image, // 파일 객체 자체를 보냄
            },
        });
        const promise = upload.promise();
        promise.catch((err) => {
            alert(err);
            return;
        });
        //setProfileImageUrl(hashImageName + extensionName);
    };

    const doSignup = async () => {
        if(signupId.trim().length < 8 || signupId.trim().length > 12) {
            alert('아이디를 입력하세요.');
            signupIdInput.current.focus();
            return;
        }
        if(nickname.trim().length < 3 || nickname.trim().length > 8) {
            alert('닉네임을 입력하세요.');
            nicknameInput.current.focus();
            return;
        }
        if(signupPassword.trim().length < 8 || signupPassword.trim().length > 12) {
            alert('비밀번호를 입력하세요.');
            signupPasswordInput.current.focus();
            return;
        }
        if(signupPasswordCheck !== signupPassword){
            alert('비밀번호 확인을 입력하세요.');
            signupPasswordCheckInput.current.focus();
            return;
        }
        //등록된 이미지가 있다면 S3로 전송 후 변경된 주소 리턴
        const data = {
            mid: signupId,
            password: signupPassword,
            nickname: nickname,
            img_url: profileImageUrl,
        };
        sendImageToS3(profileImage).then(async() => {
            //얘로 회원 등록 시켜주고
            //바로 로그인까지 연동
            try {
                const response = await member.signup(data);
                alert('회원가입이 완료되었습니다.');
                const loginResponse = await member.login({
                    mid: signupId,
                    password: signupPassword,
                });
                dispatch(userAction.setAccessToken(loginResponse.headers.authorization));
                handleUserModalState('button');
            } catch(error) {
                alert(error.response.data.message);
                if(error.response.data.message === '동일한 아이디가 존재합니다.') {
                    signupIdInput.current.focus();
                } else if(error.response.data.message === '동일한 닉네임이 이미 존재합니다.'){
                    nicknameInput.current.focus();
                }
            }
        }).catch((err) => console.log(err))
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
                            <SignupInputBox>
                                <TextInputBox inspect={true}>
                                    <FiUser size={30} />
                                    <input ref={signupIdInput} onChange={handleSignupId} value={signupId} type='text' placeholder="아이디" />
                                </TextInputBox>
                            </SignupInputBox>
                            <ErrorMessage signupMode={true}>{signupIdErrMsg}</ErrorMessage>
                            <SignupInputBox>
                                <TextInputBox>
                                    <FiHash size={30} />
                                    <input ref={nicknameInput} onChange={handleNickname} value={nickname} type='text' placeholder="닉네임"/>
                                </TextInputBox>
                            </SignupInputBox>
                            <ErrorMessage signupMode={true}>{nicknameErrMsg}</ErrorMessage>
                            <SignupInputBox>
                                <TextInputBox>
                                    <FiKey size={30} />
                                    <input ref={signupPasswordInput} onChange={handleSignupPassword} value={signupPassword} type='password' placeholder="비밀번호" />
                                </TextInputBox>
                            </SignupInputBox>
                            <ErrorMessage signupMode={true}>{signupPasswordErrMsg}</ErrorMessage>
                            <SignupInputBox>
                                <TextInputBox>
                                    <FiLock size={30} />
                                    <input ref={signupPasswordCheckInput} onChange={handleSignupPasswordCheck} value={signupPasswordCheck} type='password' placeholder="비밀번호 확인" />
                                </TextInputBox>
                            </SignupInputBox>
                            <ErrorMessage signupMode={true}>{signupPasswordCheckErrMsg}</ErrorMessage>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <ImageDiv>
                                <label htmlFor="profile-image-input">
                                    <ProfileImage src={profileImagePreview? profileImagePreview.url : defaultProfile} alt="#" />
                                </label>
                                <ImageLabel>프로필 사진</ImageLabel>
                                <input type="file" id="profile-image-input" accept="image/*" onChange={registProfileImage} style={{ display: 'none' }} />
                            </ImageDiv>
                            <br></br>
                            <SignupBtn onClick={doSignup}>
                                <span>회원가입</span>
                            </SignupBtn>
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
        margin: 9px 0px;
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
    border-radius: 16px;

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

    text-align: ${(props) => props.signupMode? 'left' : 'none'};
    height: ${(props) => props.signupMode? '8px' : 'none'};
    margin-bottom: ${(props) => props.signupMode? '10px' : '0px'};
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
    padding: 40px 0px 32px 0px;
`;

const SignupInputBox = styled.div`
    display: flex;
    opacity: ${(props) => props.isDisabled? '.5' : '1'};
`;

const SignupBtn = styled.div`
    margin: 0px auto;
    border: 1px solid black;
    width: 80px;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    background-color: #FF8F81;
   
    &:hover{
        color: white;
        opacity: .7;
        cursor: pointer;
    }
`
