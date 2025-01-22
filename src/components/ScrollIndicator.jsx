import styled from "styled-components";

const ScrollIndicator = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <IndicatorWrapper onClick={handleScroll}>
      <ScrollText>아래로 내려서 더 알아보기!</ScrollText>
      <ScrollArrow>↓</ScrollArrow>
    </IndicatorWrapper>
  );
};

const IndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 8px;
  background-color: #5887f4;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ScrollText = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: 700;
`;

const ScrollArrow = styled.span`
  font-size: 24px;
  animation: bounce 2s infinite;
  color: #fff;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

export default ScrollIndicator;
