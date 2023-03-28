import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavSection>
      <div className="nav-inner">
        <ul className="left-ul">
          <li>
            <NavLink to="/">Logo</NavLink>
          </li>
          <li>
            <NavLink to="/pick/list">Pick</NavLink>
          </li>
          <li>
            <NavLink to="/pack">Pack</NavLink>
          </li>
        </ul>
        <ul className="right-ul">
          <li>
            <NavLink to="/mypage">마이페이지</NavLink>
          </li>
          <li>
            <NavLink>로그인</NavLink>
          </li>
          <li>
            <NavLink>로그아웃</NavLink>
          </li>
          <li>
            <NavLink>회원가입</NavLink>
          </li>
        </ul>
      </div>
    </NavSection>
  );
};

const NavSection = styled.div`
  height: 72px;
  background: #432c7a;
  display: flex;
  justify-content: center;
  align-items: center;

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

export default NavBar;
