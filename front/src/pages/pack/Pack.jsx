import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PackNav from "../../components/pack/common/PackNav";

const Pack = () => {
  return (
    <>
      <PackNav />
      <PackContainer>
        <div className="pack-inner">
          <Outlet />
        </div>
      </PackContainer>
    </>
  );
};

const PackContainer = styled.div`
  display: flex;
  justify-content: center;

  .pack-inner {
    width: 1200px;
  }
`;

export default Pack;
