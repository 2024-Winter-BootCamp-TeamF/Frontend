import styled from "styled-components";
import summaryIcon from "../images/summary.png";
import practiceIcon from "../images/practice.png";
import noteIcon from "../images/note.png";
import homeIcon from "../images/mypage.png";

const Introduce = () => {
  const menuItems = [
    {
      title: "강의 자료 요약",
      icon: summaryIcon,
    },
    {
      title: "연습 문제 생성",
      icon: practiceIcon,
    },
    {
      title: "오답 노트 제공",
      icon: noteIcon,
    },
    {
      title: "마이페이지",
      icon: homeIcon,
    },
  ];

  return (
    <IntroduceWrapper>
      <MenuSection>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <MenuTitle>{item.title}</MenuTitle>
            <IconWrapper>
              <img src={item.icon} alt={item.title} />
            </IconWrapper>
          </MenuItem>
        ))}
      </MenuSection>
      <ContentSection>
        <PlaceholderText>(이미지 생기면 추가 예정)</PlaceholderText>
      </ContentSection>
    </IntroduceWrapper>
  );
};

const IntroduceWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const MenuItem = styled.div`
  background-color: #84a7ff;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #6b93ff;
  }
`;

const MenuTitle = styled.span`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  border: 2px solid #84a7ff;
  border-radius: 15px;
  padding: 20px;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.div`
  color: #999;
  font-size: 16px;
`;

export default Introduce;
