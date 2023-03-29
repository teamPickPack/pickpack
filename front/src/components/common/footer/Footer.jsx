import styled from "styled-components";

const Footer = () => {
  return (
    <FootSection>
        <span className="foot-inner">&copy; PICK&PACKER</span>
    </FootSection>
  );
};

const FootSection = styled.div`
  height: 48px;
  background: #432c7a;
  display: flex;
  justify-content: center;
  align-items: center;
  .foot-inner {
    width: 1200px;
    color: white;
    font-weight: bold;
    margin: 0 28px;
`;

export default Footer;

