import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { member } from '../../../apis/member';
import styled from 'styled-components';

export default function MypageUser() {

    const [userData, setUserData] = useState(null);
    const memberId = useSelector((state) => {
        return state.user.memberId;
    })
    useEffect(() => {
        const getUserInfo = async () => {
            const response = await member.info(memberId);
            console.log(response);
            setUserData({
                mid: response.mid,
                nickname: response.nickname,
                password: '********',
                imgUrl: response.img_url,
            })
        }
        getUserInfo();
    }, [])
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '0', bottom: '0', left: '240px', right: '0'}}>
            {userData && <>
                <div>
                    <h1>회원정보</h1>
                    <img alt={'#'} width={120} height={120} src={`https://pickpack8.s3.ap-northeast-2.amazonaws.com/member/${userData.imgUrl}`} style={{height: '120px', width: '120px',border: '1px solid #432c7a', borderRadius: '50%'}}/>
                </div>
                <br></br>
                <br></br>
                <div style={{}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{marginRight: '16px', fontSize: '16px'}}>아이디:</span>
                        <div style={{borderBottom: '1px solid black', width: '184px', padding: '0px 8px',textAlign: 'left', fontSize: '24px'}}>{userData.mid}</div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{marginRight: '16px', fontSize: '16px'}}>닉네임:</span>
                        <div style={{borderBottom: '1px solid black', width: '184px', padding: '0px 8px',textAlign: 'left', fontSize: '24px'}}>{userData.nickname}</div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{marginRight: '16px', fontSize: '16px'}}>비밀번호:</span>
                        <div style={{borderBottom: '1px solid black', width: '184px', padding: '0px 8px',textAlign: 'left', fontSize: '24px'}}>{userData.password}</div>
                    </div>
                </div>
                <br></br>
                <UpdateUserBtn onClick={() => alert('서비스 준비 중입니다.')}>
                    <span>수정</span>
                </UpdateUserBtn>
            </>}
        </div>
    )
};

const UpdateUserBtn = styled.div`
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