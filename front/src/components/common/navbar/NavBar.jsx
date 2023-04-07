import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import UserModal from "./elements/UserModal";
import { useSelector } from "react-redux";
import airplaneImg from "../../../assets/image/airplane-img.png";

const NavBar = () => {
  const [userModalState, setUserModalState] = useState({
    visible: false,
    loginMode: null,
  });
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });
  const handleUserModalState = (type, mode) => {
    if (type === "button") {
      if (mode === "login") {
        setUserModalState((userModalState) => ({
          visible: !userModalState.visible,
          loginMode: true,
        }));
      } else {
        setUserModalState((userModalState) => ({
          visible: !userModalState.visible,
          loginMode: false,
        }));
      }
    } else {
      if (userModalState) {
        setUserModalState({
          visible: false,
          loginMode: null,
        });
      }
    }
  };

  const navigator = useNavigate();

  const logoutHandler = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location = "/";
    }
    sessionStorage.clear();
  };
  return (
    <NavSection>
      <div className="nav-inner">
        <ul className="left-ul">
          <li>
            <NavLink to="/" className="logo">
              <img src={airplaneImg} alt="logo" />
              <span>Pick&Packer</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/pick/list">Pick</NavLink>
          </li>
          <li>
            <NavLink to="/pack">Pack</NavLink>
          </li>
        </ul>
        <ul className="right-ul">
          {accessToken === null ? (
            <>
              <li>
                <NavLink
                  onClick={() => handleUserModalState("button", "login")}
                >
                  로그인
                </NavLink>
                {userModalState.visible && (
                  <UserModal
                    initialLoginMode={userModalState.loginMode}
                    handleUserModalState={handleUserModalState}
                  />
                )}
              </li>
              <li>
                <NavLink
                  onClick={() => handleUserModalState("button", "signup")}
                >
                  회원가입
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/mypage">마이페이지</NavLink>
              </li>
              <li>
                <NavLink onClick={logoutHandler}>로그아웃</NavLink>
              </li>
            </>
          )}

          {userModalState.visible &&
            createPortal(<Background />, document.getElementById("background"))}
        </ul>
      </div>
    </NavSection>
  );
};

const NavSection = styled.div`
  height: 56px;
  background: #432c7a;
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 100%;
  // position: fixed;
  // z-index: 10000;

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 40px;
    }

    span {
      font-size: 16px;
      font-weight: 900;

      background: linear-gradient(
        170deg,
        #fff2db 20.29%,
        #ff8fb1 60.29%,
        #ffffff 80.36%
      );

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  .nav-inner {
    width: 1200px;
    margin: 0 28px;
    display: flex;
    text-align: center;
    justify-content: space-between;

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;

      li {
        display: inline-block;

        a {
          color: #ffffff;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
      }
    }

    .left-ul {
      li {
        margin-right: 24px;
      }
    }

    .right-ul {
      li {
        margin-left: 24px;
      }
    }
  }
`;
const Background = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
`;

export default NavBar;
