import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const ChatButton = (props) => {
  const [footerCheck, setFooterCheck] = useState(false);

  const chatFixedHandler = () => {
    const totalHeight = document.body.scrollHeight - 48;
    const scrollPoint = window.scrollY + window.innerHeight;

    if (totalHeight <= scrollPoint) {
      setFooterCheck(true);
    } else {
      setFooterCheck(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", chatFixedHandler);
    window.addEventListener("resize", chatFixedHandler);
    return () => {
      window.removeEventListener("scroll", chatFixedHandler);
      window.removeEventListener("resize", chatFixedHandler);
    };
  }, []);

  return (
    <Wrapper
      footerCheck={footerCheck}
      onClick={() => {
        props.setChatOpen(!props.chatOpen);
      }}
    >
      <ChatbuttonSVG />
    </Wrapper>
  );
};

const ChatbuttonSVG = () => {
  return (
    <svg
      width="40"
      height="38"
      viewBox="0 0 64 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.875 52.8906C35.0739 52.7378 37.254 52.3821 39.3875 51.8281C42.0204 52.6316 44.8037 52.8134 47.5187 52.3594C47.6262 52.342 47.7349 52.3337 47.8438 52.3344C48.8125 52.3344 50.0844 52.8969 51.9375 54.0844V52.1313C51.9379 51.7933 52.0281 51.4616 52.1989 51.17C52.3696 50.8785 52.6148 50.6375 52.9094 50.4719C53.7156 50.0156 54.4656 49.4906 55.15 48.9125C57.85 46.625 59.375 43.575 59.375 40.3438C59.375 39.2594 59.2031 38.2063 58.8781 37.2C59.6937 35.6781 60.3531 34.0781 60.8375 32.4188C62.4036 34.7657 63.2428 37.5223 63.25 40.3438C63.25 44.7344 61.2062 48.8281 57.6719 51.8219C57.0819 52.3212 56.4609 52.7825 55.8125 53.2031V57.7687C55.8125 59.3406 54 60.2437 52.7219 59.3094C51.5133 58.4059 50.2618 57.5612 48.9719 56.7781C48.6025 56.557 48.2182 56.3618 47.8219 56.1937C46.7594 56.3531 45.6719 56.4344 44.575 56.4344C40.1625 56.4344 36.0875 55.1125 32.8781 52.8906H32.875ZM9.54375 43.7594C3.96875 39.0312 0.75 32.5906 0.75 25.6875C0.75 11.5844 14.0562 0.3125 30.3031 0.3125C46.5531 0.3125 59.8594 11.5844 59.8594 25.6875C59.8594 39.7938 46.55 51.0656 30.3031 51.0656C28.4781 51.0656 26.6719 50.925 24.9031 50.6438C24.1375 50.825 21.0781 52.6437 16.6687 55.8625C15.0719 57.0312 12.8062 55.9031 12.8062 53.9375V46.15C11.6644 45.4301 10.5742 44.6313 9.54375 43.7594ZM25.0094 45.8406C25.1437 45.8406 25.2812 45.85 25.4156 45.8719C27.0094 46.1406 28.6469 46.2781 30.3031 46.2781C44.0281 46.2781 55.0125 36.9719 55.0125 25.6875C55.0125 14.4062 44.0281 5.1 30.3031 5.1C16.5844 5.1 5.59375 14.4062 5.59375 25.6875C5.59375 31.1437 8.15937 36.2812 12.6969 40.125C13.8375 41.0875 15.0906 41.9625 16.4344 42.725C17.1875 43.15 17.6531 43.9437 17.6531 44.8V49.2906C21.1406 46.95 23.4344 45.8406 25.0094 45.8406ZM17.7062 30.4781C15.5656 30.4781 13.8312 28.7594 13.8312 26.6469C13.8312 24.5312 15.5656 22.8156 17.7062 22.8156C19.8469 22.8156 21.5813 24.5312 21.5813 26.6469C21.5813 28.7625 19.8469 30.4781 17.7062 30.4781ZM30.3031 30.4781C28.1625 30.4781 26.4281 28.7594 26.4281 26.6469C26.4281 24.5312 28.1625 22.8156 30.3031 22.8156C32.4437 22.8156 34.1781 24.5312 34.1781 26.6469C34.1781 28.7625 32.4437 30.4781 30.3031 30.4781ZM42.9 30.4781C40.7594 30.4781 39.025 28.7594 39.025 26.6469C39.025 24.5312 40.7594 22.8156 42.9 22.8156C45.0406 22.8156 46.775 24.5312 46.775 26.6469C46.775 28.7625 45.0406 30.4781 42.9 30.4781Z"
        fill="white"
      />
    </svg>
  );
};

const Wrapper = styled.div`
  background: #1c98f7;
  z-index: 100;
  padding: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: fixed;
  right: 24px;
  bottom: ${(props) => {
    return props.footerCheck ? 64 : 32;
  }}px;
  transition: all 0.2s ease;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 4px 1px #1c98f7;

    svg {
      path {
        transition: all 0.2s ease;
        fill: #e7e7e7;
      }
    }
  }
`;
export default ChatButton;
