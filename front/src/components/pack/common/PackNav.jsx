import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PackNav = () => {
  return (
    <NavSection>
      <div className="nav-inner">
        <ul className="left-ul">
          <li>
            <NavLink to="/pack/buy">살게요</NavLink>
          </li>
          <li>
            <NavLink to="/pack/sell">팔게요</NavLink>
          </li>
          <li>
            <NavLink to="/pack/borrow">빌려주세요</NavLink>
          </li>
          <li>
            <NavLink to="/pack/rent">빌려드려요</NavLink>
          </li>
        </ul>
      </div>
    </NavSection>
  );
};

const NavSection = styled.div`
  height: 56px;
  background: #80489c;
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
  }
`;

export default PackNav;
