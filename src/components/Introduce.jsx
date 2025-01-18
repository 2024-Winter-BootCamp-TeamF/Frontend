import styled from "styled-components";
import summaryIcon from "../images/summary.png";
import practiceIcon from "../images/practice.png";
import noteIcon from "../images/note.png";
import homeIcon from "../images/mypage.png";
import circlesIcon from "../images/circles.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Introduce = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";  // 로그인 상태 확인

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/upload");  // 로그인 상태면 업로드 페이지로
    } else {
      navigate("/login");   // 비로그인 상태면 로그인 페이지로
    }
  };

  const menuItems = [
    {
      title: "강의 자료 요약",
      icon: summaryIcon,
      bgColor: "#5887F4",
      content: `너무 많아서,
정리되어 었지 않아서,
읽기 힘들었던 강의 자료를
AI를 통해 요약해보세요!`,
    },
    {
      title: "연습 문제 생성",
      icon: practiceIcon,
      bgColor: "#86ABFF",
      content: `강의 자료와 문제 유형을
함께 업로드 해보세요!
실전과 유사한 문제로
학습을 진행할 수 있어요!`,
    },
    {
      title: "오답 노트 제공",
      icon: noteIcon,
      bgColor: "#9EBBFF",
      content: `연습 문제를 풀고 난 후,
AI 오답노트를 생성해보세요!
오답과 헷갈리는 문제의 
해설과 추가 개념들을 
쉽게 확인할 수 있어요!`,
    },
    {
      title: "마이페이지",
      icon: homeIcon,
      bgColor: "#B8CEFF",
      content: `지금까지 만든 생성물은
마이페이지에 저장 가능!
마이페이지에서 간편하게
확인하고 복습해보세요!
`,
    },
  ];

  return (
    <IntroduceWrapper>
      <ScrollSection>
        <MenuSection>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              bgColor={item.bgColor}
              isSelected={selectedIndex === index}
              onClick={() =>
                setSelectedIndex(index === selectedIndex ? null : index)
              }
            >
              <MenuTitle>{item.title}</MenuTitle>
              <IconWrapper>
                <img src={item.icon} alt={item.title} />
              </IconWrapper>
              {selectedIndex === index && (
                <ItemContent>{item.content}</ItemContent>
              )}
            </MenuItem>
          ))}
        </MenuSection>
        <ContentSection>
          <PlaceholderText>
            {selectedIndex !== null
              ? `${menuItems[selectedIndex].title} 관련 이미지`
              : "(이미지 생기면 추가 예정)"}
          </PlaceholderText>
          <DotButton onClick={handleButtonClick}>
            <img src={circlesIcon} alt={isLoggedIn ? "업로드" : "로그인/회원가입"} />
            <ButtonText className="button-text">
              {isLoggedIn ? "업로드 페이지로!" : "로그인/회원가입"}
            </ButtonText>
          </DotButton>
        </ContentSection>
      </ScrollSection>
    </IntroduceWrapper>
  );
};

const IntroduceWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  margin: 0 auto;
  padding: 40px;
  position: relative;
`;

const ScrollSection = styled.div`
  width: 100%;
  height: 650px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const MenuItem = styled.div`
  background-color: ${(props) => props.bgColor};
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${(props) =>
    props.isSelected &&
    `
    flex: 1;
    
    ${MenuTitle} {
      position: absolute;
      bottom: 20px;
      left: 20px;
      font-size: 20px;
    }
    
    ${IconWrapper} {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    
    ${ItemContent} {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: left;
      font-size: 24px
    }
  `}
`;

const MenuTitle = styled.span`
  color: white;
  font-size: 20px;
  font-weight: 700;
  transition: all 0.3s ease;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ContentSection = styled.div`
  background-color: #fff;
  flex: 1;
  border: 5px solid #5887f4;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PlaceholderText = styled.div`
  color: #999;
  font-size: 16px;
`;

const ItemContent = styled.div`
  color: white;
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.9;
  white-space: pre-line;
`;

const DotButton = styled.button`
  position: absolute;
  bottom: -7%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 5px solid #5887f4;
  border-radius: 50px;
  cursor: pointer;
  padding: 20px;
  display: flex;
  align-items: center;
  width: 125px;
  transition: width 0.5s ease;

  &:hover {
    width: 270px;
    .button-text {
      opacity: 1;
      transform: translateX(-10px);
    }
  }

  img {
    width: 75px;
    height: auto;
  }
`;

const ButtonText = styled.span`
  position: absolute;
  left: 45%;
  white-space: nowrap;
  opacity: 0;
  color: #5887f4;
  font-size: 20px;
  font-family: "HakgyoansimAllimjangTTF-R";
  transform: translateX(-20px);
  transition: all 0.5s ease;
`;

export default Introduce;
